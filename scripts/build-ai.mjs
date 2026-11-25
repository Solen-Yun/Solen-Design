/* Build the machine-readable AI surface under ai/.

   Everything here is derived from docs/registry.jsx — the same source the
   gallery reads — so the catalog, the per-component details and the
   per-framework packages can never drift from the workbench.

   Usage: npm run ai:build */

import { createServer } from "vite";
import { mkdir, writeFile, readdir, unlink, rm, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const out = resolve(root, "ai");
const version = JSON.parse(await readFile(resolve(root, "package.json"), "utf-8")).version;

const readRegistry = async () => {
  const server = await createServer({
    root,
    /* hmr 关掉：构建用不到它，而且 dev server 开着时会占走 HMR 端口，
       把这里的模块加载拖到超时。 */
    server: { middlewareMode: true, hmr: { port: 24679, host: "127.0.0.1" } },
    appType: "custom",
    logLevel: "error",
    /* SSR externalizes bare "gsap" to its UMD main, whose export lacks
       registerPlugin; the ESM index.js is the one that works. */
    resolve: { alias: [{ find: /^gsap$/, replacement: resolve(root, "node_modules/gsap/index.js") }] },
  });
  try {
    const mod = await server.ssrLoadModule("/docs/registry.jsx");
    const components = mod.COMPONENTS ?? mod.default ?? [];
    /* Each entry's frameworks and prompt live in a sibling sources module
       (the workbench ships them only on detail pages); merge them back so
       the AI surface sees the same fields it always has. */
    const merged = [];
    for (const component of components) {
      const sources = await server.ssrLoadModule(`/docs/components/${component.id}-sources.jsx`);
      merged.push({ ...component, ...sources.default });
    }
    return merged;
  } finally {
    await server.close();
  }
};

const slug = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* Remove the generated files inside a folder, leaving the folder itself. */
const prune = async (folder, extension) => {
  let entries = [];
  try {
    entries = await readdir(folder, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const path = resolve(folder, entry.name);
    if (entry.isDirectory()) await prune(path, extension);
    else if (entry.name.endsWith(extension)) await unlink(path).catch(() => {});
  }
};

/* Keywords an agent is likely to search for: the component's own words
   plus the headings of its recreation prompt. */
const keywords = (component) => {
  const words = new Set();
  const push = (text) => {
    for (const word of String(text).toLowerCase().split(/[^\p{L}\p{N}+#.-]+/u)) {
      if (word.length > 1 && !/^\d+$/.test(word)) words.add(word);
    }
  };
  push(component.id);
  push(component.name);
  push(component.title);
  push(component.cardDescription);
  for (const line of String(component.prompt ?? "").split("\n")) {
    if (/^#{1,3}\s/.test(line)) push(line.replace(/^#+\s*/, ""));
  }
  return [...words].slice(0, 160);
};

const apiSummary = (rows) =>
  (rows ?? []).map((row) => ({
    name: row.name,
    type: row.type,
    default: row.default,
    description: row.description,
  }));

/* The skill file an agent reads before touching the library. */
const skillDocument = (catalog) => `# Solen Design — AI 接入

一个纯 CSS 设计系统，附带 React / Vue / Svelte / Solid / Preact / Vanilla
六套框架入口。组件自带可复制的源码与一份「复刻提示词」，代理可以直接
取用。另有 151 套网站风格（视觉风格、布局模式），每套一份设计文档。

## 快速开始

接入方式两条，选一条即可。

**接了 MCP**（接入见仓库 \`mcp/README.md\`）：搜风格用 \`search_styles\`，
取风格设计文档用 \`get_style_doc\`，搜组件用 \`search_components\`，取组件
的提示词、props 与源码用 \`get_component\`。

**没接 MCP**：用自带的命令行（在仓库根或包根运行）：

\`\`\`sh
# 列出全部组件
node ai/scripts/solen.mjs list

# 按用途找组件（关键词需全部命中）
node ai/scripts/solen.mjs search "折叠 滚动"

# 看单个组件的完整说明（props、用法、提示词）
node ai/scripts/solen.mjs show fluid-tooltip --framework react

# 把某个组件的框架版本写进项目
node ai/scripts/solen.mjs pull fluid-tooltip --framework react --out src/components/solen/fluid-tooltip
\`\`\`

命令默认读取本仓库（或安装的包）的 \`ai/\` 目录；\`--base <url>\` 可改从
远端站点读取（例如 \`--base https://example.com\`）。风格检索不走这条
命令行，见下一节。

## 网站风格

151 套风格（视觉风格 133、布局模式 18），每套一份中英双语的设计文档，
就是交给 agent 的复刻提示词。

| 需要什么 | 去哪拿 |
| --- | --- |
| 按关键词搜风格 | MCP \`search_styles\`；或浏览 \`docs/style.html\` 目录卡 |
| 一套风格的完整设计文档 | \`docs/styles/<id>.md\`（英文 \`<id>.en.md\`），或 MCP \`get_style_doc\` |
| 分类表（视觉 15 类、布局 6 类） | MCP \`list_categories\`；分类 id 就是目录卡上的 \`data-cat\` |

按某套风格写页面的路数：取它的设计文档，照 Colors / Typography /
Components / Do's and Don'ts 落地；QUICK COLOR REFERENCE 是色值速查，
EXAMPLE COMPONENT PROMPTS 可直接当提示词用。

## 只读 JSON

| 路径 | 内容 |
| --- | --- |
| \`ai/catalog.json\` | 全部组件的索引：id、名称、说明、关键词、props、框架 |
| \`ai/search-index.json\` | 检索用的小文本索引 |
| \`ai/components/<id>.json\` | 单个组件的详情，含完整复刻提示词 |
| \`ai/packages/<id>/<framework>.json\` | 指定框架的入口文件、安装命令、用法；共享核心按仓库路径引用 |
| \`llms.txt\` | 库的整体说明与文件地图 |

## 写代码时的约束

- 只用 \`--sd-*\` 令牌，不写死颜色与尺寸。
- 类名一律 \`.sd-*\`，样式写进 \`sd.components\` 层。
- 不覆盖 \`sd.tokens\` 与 \`sd.base\` 层里的规则。
- 明暗两套都要成立：只改令牌值，不写 \`color\`。

## 组件清单

| id | 名称 | 说明 |
| --- | --- | --- |
${catalog
  .map((c) => `| \`${c.id}\` | ${c.name} | ${c.cardDescription || c.description.slice(0, 60)} |`)
  .join("\n")}
`;

const build = async () => {
  const components = await readRegistry();
  if (!components.length) throw new Error("registry produced no components");

  /* Only the generated parts are cleared — ai/scripts holds the CLI.
     Files are removed one by one: dropping whole folders can fail on
     Windows when a watcher still holds a handle on them. */
  await prune(resolve(out, "components"), ".json");
  await prune(resolve(out, "packages"), ".json");
  await mkdir(resolve(out, "components"), { recursive: true });
  await mkdir(resolve(out, "packages"), { recursive: true });

  const catalog = [];
  const search = [];

  for (const component of components) {
    const id = component.id ?? slug(component.name);
    const frameworks = component.frameworks ?? [];
    const detail = {
      id,
      name: component.name,
      title: component.title ?? component.name,
      description: component.description ?? "",
      cardDescription: component.cardDescription ?? "",
      docsUrl: `/docs/${id}.html`,
      registry: "docs/registry.jsx",
      spec: "src/components/" + id + "/SPEC.md",
      keywords: keywords(component),
      api: apiSummary(component.api),
      frameworks: frameworks.map((framework) => ({
        id: slug(framework.name),
        name: framework.name,
        install: framework.install ?? "",
        dependencies: framework.dependencies ? framework.dependencies.npm : null,
        files: (framework.files ?? []).map((file) => file.name),
        api: apiSummary(framework.api),
        usage: (framework.usage ?? []).map((usage) => ({ file: usage.file, code: usage.code })),
      })),
      prompt: component.prompt ?? "",
    };

    catalog.push({
      id,
      name: component.name,
      description: detail.description,
      cardDescription: detail.cardDescription,
      docsUrl: detail.docsUrl,
      frameworks: detail.frameworks.map((framework) => framework.id),
    });

    search.push({
      id,
      name: component.name,
      text: [
        component.name,
        component.title,
        component.description,
        component.cardDescription,
        detail.keywords.join(" "),
      ]
        .join(" ")
        .toLowerCase(),
    });

    await writeFile(
      resolve(out, "components", `${id}.json`),
      JSON.stringify(detail),
    );

    for (const framework of frameworks) {
      const frameworkId = slug(framework.name);
      /* The first file is the framework entry; the rest are the shared
         core every framework ships (engine, runtime, types). The core is
         referenced by its path in the repo rather than copied, so the
         published JSON stays small and can never drift from src/. */
      const files = framework.files ?? [];
      const entry = files[0];
      const core = files.slice(1).map((file) => ({
        name: file.name,
        path: `src/components/${id}/${file.name}`,
      }));
      const pkg = {
        id,
        framework: frameworkId,
        frameworkName: framework.name,
        install: framework.install ?? "",
        dependencies: framework.dependencies ?? null,
        files: entry ? [{ name: entry.name, code: entry.code }] : [],
        core,
        usage: (framework.usage ?? []).map((usage) => ({ file: usage.file, code: usage.code })),
        api: apiSummary(framework.api),
        spec: detail.spec,
        detail: `../../components/${id}.json`,
      };
      await mkdir(resolve(out, "packages", id), { recursive: true });
      await writeFile(
        resolve(out, "packages", id, `${frameworkId}.json`),
        JSON.stringify(pkg),
      );
    }
  }

  catalog.sort((a, b) => a.id.localeCompare(b.id));
  search.sort((a, b) => a.id.localeCompare(b.id));

  await writeFile(
    resolve(out, "catalog.json"),
    JSON.stringify({ name: "Solen Design", version: version, components: catalog }),
  );
  await writeFile(
    resolve(out, "search-index.json"),
    JSON.stringify({ components: search }),
  );
  await writeFile(resolve(out, "SKILL.md"), skillDocument(catalog));

  console.log(
    `ai/: ${catalog.length} components, ${catalog.reduce((sum, c) => sum + c.frameworks.length, 0)} packages`,
  );
};

await build();
