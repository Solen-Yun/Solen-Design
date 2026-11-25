#!/usr/bin/env node
/* Solen Design — CLI for AI agents.
 *
 *   node scripts/solen.mjs list
 *   node scripts/solen.mjs search "keyword keyword"
 *   node scripts/solen.mjs recommend "what I need"
 *   node scripts/solen.mjs show <id> [--framework react]
 *   node scripts/solen.mjs pull  <id> --framework react --out <dir>
 *
 * Reads the generated JSON in the parent folder by default, or a remote
 * site with --base <url>. Results are JSON on stdout.
 * Exit codes: 0 ok, 1 unreadable source, 2 bad arguments or file conflict,
 * 3 no match. */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const localRoot = resolve(here, "..");

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));

const parseArgs = (argv) => {
  const options = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith("--")) options[key] = true;
      else {
        options[key] = next;
        i += 1;
      }
    } else options._.push(arg);
  }
  return options;
};

const fail = (code, message, detail) => {
  process.stderr.write(`${message}\n`);
  if (detail) process.stderr.write(`${detail}\n`);
  process.exit(code);
};

/* A component may ship fewer frameworks than the full set — say which. */
const readPackage = async (reader, id, framework) => {
  try {
    return await reader.json(`packages/${id}/${framework}.json`);
  } catch {
    let available = [];
    try {
      const detail = await reader.json(`components/${id}.json`);
      available = detail.frameworks.map((entry) => entry.id);
    } catch {
      /* the component itself is unknown — fall through to the generic error */
    }
    if (available.length) {
      fail(2, `"${id}" has no ${framework} entry`, `available: ${available.join(", ")}`);
    }
    fail(1, `could not read the component data`, `missing packages/${id}/${framework}.json`);
  }
};

const emit = (value) => {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
};

/* Local files or a remote base URL — same shape either way. */
const makeReader = (base) => {
  if (!base) {
    const repoRoot = resolve(localRoot, "..");
    return {
      async json(path) {
        const file = resolve(localRoot, path);
        if (!existsSync(file)) throw new Error(`missing ${path}`);
        return readJson(file);
      },
      async source(path) {
        const file = resolve(repoRoot, path);
        if (!existsSync(file)) throw new Error(`missing ${path}`);
        return readFile(file, "utf8");
      },
      kind: "local",
    };
  }
  const root = base.replace(/\/+$/, "");
  return {
    async json(path) {
      /* The generated files live in ai/ at the site root. */
      const response = await fetch(`${root}/ai/${path}`);
      if (!response.ok) throw new Error(`${response.status} ai/${path}`);
      return response.json();
    },
    async source(path) {
      const response = await fetch(`${root}/${path}`);
      if (!response.ok) throw new Error(`${response.status} ${path}`);
      return response.text();
    },
    kind: "remote",
  };
};

const FRAMEWORKS = ["react", "vue", "svelte", "solid", "preact", "vanilla"];

const normalizeFramework = (value) => {
  const id = String(value ?? "react").toLowerCase();
  if (!FRAMEWORKS.includes(id)) {
    fail(2, `unknown framework "${value}"`, `expected one of: ${FRAMEWORKS.join(", ")}`);
  }
  return id;
};

const terms = (value) =>
  String(value ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

const commands = {
  async list(reader) {
    const catalog = await reader.json("catalog.json");
    emit({
      count: catalog.components.length,
      components: catalog.components.map((component) => ({
        id: component.id,
        name: component.name,
        description: component.cardDescription || component.description,
        frameworks: component.frameworks,
        docsUrl: component.docsUrl,
      })),
    });
  },

  async search(reader, options) {
    const query = terms(options._[0]);
    if (!query.length) fail(2, "search needs keywords", 'usage: search "keyword keyword"');
    const index = await reader.json("search-index.json");
    const matches = index.components.filter((component) =>
      query.every((term) => component.text.includes(term)),
    );
    if (!matches.length) fail(3, "no match", query.join(" "));
    const catalog = await reader.json("catalog.json");
    emit({
      query: options._[0],
      count: matches.length,
      components: matches.map((match) => {
        const component = catalog.components.find((entry) => entry.id === match.id);
        return {
          id: match.id,
          name: component?.name,
          description: component?.cardDescription || component?.description,
          docsUrl: component?.docsUrl,
        };
      }),
    });
  },

  async recommend(reader, options) {
    const query = terms(options._[0]);
    if (!query.length) fail(2, "recommend needs a description", 'usage: recommend "what I need"');
    const index = await reader.json("search-index.json");
    const catalog = await reader.json("catalog.json");
    const scored = index.components
      .map((component) => {
        const hits = query.filter((term) => component.text.includes(term)).length;
        const coverage = hits / query.length;
        return { component, hits, score: coverage + (hits > 0 ? Math.min(0.2, hits * 0.05) : 0) };
      })
      .filter((entry) => entry.hits > 0)
      .sort((a, b) => b.score - a.score || a.component.id.localeCompare(b.component.id));
    const limit = Number(options.limit ?? 5);
    if (!Number.isFinite(limit) || limit < 1) fail(2, "--limit must be a positive number");
    if (!scored.length) fail(3, "no match", query.join(" "));
    emit({
      query: options._[0],
      count: Math.min(limit, scored.length),
      components: scored.slice(0, limit).map((entry) => {
        const component = catalog.components.find((item) => item.id === entry.component.id);
        return {
          id: entry.component.id,
          name: component?.name,
          score: Number(entry.score.toFixed(3)),
          description: component?.cardDescription || component?.description,
          docsUrl: component?.docsUrl,
        };
      }),
    });
  },

  async show(reader, options) {
    const id = options._[0];
    if (!id) fail(2, "show needs a component id", "usage: show <id> [--framework react]");
    const detail = await reader.json(`components/${id}.json`);
    const framework = options.framework ? normalizeFramework(options.framework) : null;
    if (!framework) {
      emit({
        id: detail.id,
        name: detail.name,
        description: detail.description,
        api: detail.api,
        frameworks: detail.frameworks,
        docsUrl: detail.docsUrl,
        spec: detail.spec,
        prompt: detail.prompt,
      });
      return;
    }
    const pkg = await readPackage(reader, id, framework);
    emit({
      id: pkg.id,
      framework: pkg.framework,
      install: pkg.install,
      dependencies: pkg.dependencies,
      files: pkg.files.map((file) => file.name),
      core: (pkg.core ?? []).map((file) => file.path),
      usage: pkg.usage,
      api: pkg.api,
    });
  },

  async pull(reader, options) {
    const id = options._[0];
    const framework = normalizeFramework(options.framework);
    const out = options.out;
    if (!id) fail(2, "pull needs a component id", "usage: pull <id> --framework react --out <dir>");
    if (!out || out === true) fail(2, "pull needs --out <dir>");
    const pkg = await readPackage(reader, id, framework);
    const files = [...pkg.files];
    for (const core of pkg.core ?? []) {
      files.push({ name: core.name, code: await reader.source(core.path) });
    }
    const target = resolve(String(out));
    for (const file of files) {
      const path = resolve(target, file.name);
      if (existsSync(path)) {
        const current = await readFile(path, "utf8");
        if (current !== file.code) {
          fail(2, `refusing to overwrite ${path}`, "the file differs — remove it or pull elsewhere");
        }
        continue;
      }
      await mkdir(dirname(path), { recursive: true });
      await writeFile(path, file.code, "utf8");
    }
    emit({
      id: pkg.id,
      framework: pkg.framework,
      out: target,
      written: files.map((file) => file.name),
    });
  },
};

const run = async () => {
  const options = parseArgs(process.argv.slice(2));
  const command = options._.shift();
  if (!command || !commands[command]) {
    fail(2, "unknown command", `usage: ${Object.keys(commands).join(" | ")}`);
  }
  const reader = makeReader(typeof options.base === "string" ? options.base : null);
  try {
    await commands[command](reader, options);
  } catch (error) {
    fail(1, "could not read the component data", error.message);
  }
};

await run();
