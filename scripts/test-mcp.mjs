/* MCP 服务的自测：把服务拉起来，按 JSON-RPC 走一遍握手、列工具、逐个调工具。
   写操作跑在临时副本里，不碰仓库。 */

import { spawn } from "node:child_process";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, "..");
const SERVER = join(REPO, "mcp/server.mjs");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function start(root) {
  const child = spawn(process.execPath, [SERVER], {
    env: { ...process.env, SOLEN_ROOT: root },
    stdio: ["pipe", "pipe", "pipe"],
  });
  const pending = new Map();
  let buffer = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    buffer += chunk;
    let cut;
    while ((cut = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, cut).trim();
      buffer = buffer.slice(cut + 1);
      if (!line) continue;
      const message = JSON.parse(line);
      const resolvePending = pending.get(message.id);
      if (resolvePending) {
        pending.delete(message.id);
        resolvePending(message);
      }
    }
  });
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => process.stderr.write("[server] " + chunk));
  let nextId = 0;
  const call = (method, params) =>
    new Promise((resolvePending, reject) => {
      const id = ++nextId;
      pending.set(id, resolvePending);
      child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id, method, params }) + "\n");
      setTimeout(() => reject(new Error(`${method} 超时`)), 15000);
    });
  const notify = (method, params) =>
    child.stdin.write(JSON.stringify({ jsonrpc: "2.0", method, params }) + "\n");
  return { child, call, notify };
}

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? " — " + detail : ""}`);
};

async function main() {
  /* npm 包要带齐读取工具用到的数据：包里缺一个文件，装成依赖后对应的工具就废了。 */
  const { files = [] } = JSON.parse(await readFile(join(REPO, "package.json"), "utf8"));
  const covered = (path) => files.some((entry) => path === entry || path.startsWith(entry + "/"));
  const needed = [
    "mcp/server.mjs",
    "mcp/catalog.mjs",
    "docs/style.html",
    "docs/style-field.js",
    "docs/styles/neo-brutalist.md",
    "ai/catalog.json",
    "ai/search-index.json",
    "ai/components/gooey-nav.json",
    "ai/packages/gooey-nav/react.json",
  ];
  const unpacked = needed.filter((path) => !covered(path));
  check("npm 包带齐读取工具要用的数据", unpacked.length === 0, unpacked.join("、"));

  /* 写操作在临时副本里跑 */
  const sandbox = await mkdtemp(join(tmpdir(), "solen-mcp-"));
  await cp(join(REPO, "docs"), join(sandbox, "docs"), { recursive: true });
  await cp(join(REPO, "ai"), join(sandbox, "ai"), { recursive: true });
  await cp(join(REPO, "package.json"), join(sandbox, "package.json"));
  await cp(join(REPO, "llms.txt"), join(sandbox, "llms.txt"));

  const { child, call, notify } = start(sandbox);

  const init = await call("initialize", {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "test", version: "0" },
  });
  check("initialize", init.result?.protocolVersion === "2025-06-18" && init.result?.serverInfo?.name === "solen-design",
    JSON.stringify(init.result?.serverInfo));
  notify("notifications/initialized");

  const list = await call("tools/list");
  const tools = list.result?.tools ?? [];
  check("tools/list", tools.length === 9, `${tools.length} 个工具：${tools.map((t) => t.name).join(", ")}`);
  check("每个工具都有 description 与 inputSchema",
    tools.every((t) => t.description && t.inputSchema?.type === "object"));

  const text = (res) => res.result?.content?.[0]?.text ?? "";
  const callTool = async (name, args) => {
    const res = await call("tools/call", { name, arguments: args });
    if (res.result?.isError) throw new Error(text(res));
    return text(res);
  };

  /* 只读 */
  const cats = JSON.parse(await callTool("list_categories"));
  check("list_categories", cats.visual.length === 15 && cats.layout.length === 6,
    `视觉 ${cats.visual.length} 类 / 布局 ${cats.layout.length} 类；极简留白 ${cats.visual[0].count} 套`);

  const found = JSON.parse(await callTool("search_styles", { query: "玻璃" }));
  check("search_styles", found.total > 0 && found.styles.every((s) => s.collection && s.doc),
    `「玻璃」命中 ${found.total} 套，第一条 ${found.styles[0]?.id}`);

  const doc = await callTool("get_style_doc", { id: "neo-brutalist" });
  check("get_style_doc", doc.includes("## Colors") && doc.includes("QUICK COLOR REFERENCE"),
    `${doc.length} 字符`);

  const comps = JSON.parse(await callTool("search_components", { query: "导航" }));
  check("search_components", comps.total > 0 && comps.components[0]?.id,
    `「导航」命中 ${comps.total} 个，第一条 ${comps.components[0]?.id}`);

  const spec = await callTool("get_component", { id: "gooey-nav", include: "all" });
  check("get_component", spec.includes("复现提示词") && spec.includes("export"),
    `${spec.length} 字符`);

  const audit = JSON.parse(await callTool("audit_catalog"));
  check("audit_catalog", audit.styles === 151 && typeof audit.problems.length === "number",
    `${audit.styles} 套风格，${audit.problems.length} 处问题`);

  /* 写操作（在副本里） */
  const added = JSON.parse(await callTool("add_style", {
    id: "test-style",
    nameZh: "测试风格",
    nameEn: "Test Style",
    collection: "visual",
    categories: ["minimal"],
    descZh: "一句话简介。",
    descEn: "One-line description.",
    tags: ["甲", "乙"],
    theme: "light",
    colors: [{ name: "Ink", value: "#000000", token: "ink", role: "文字" }],
  }));
  check("add_style", added.written.length === 4 && added.remaining.length === 3, added.written.join(", "));

  const newDoc = await readFile(join(sandbox, "docs/styles/test-style.md"), "utf8");
  check("add_style 写出的文档有完整章节",
    newDoc.includes("## Colors") && newDoc.includes("## Agent Prompt Guide") && newDoc.includes("## Type Scale"));

  const afterAdd = JSON.parse(await callTool("audit_catalog"));
  const newOnes = afterAdd.problems.filter((p) => p.id === "test-style");
  check("add_style 后目录体检：新风格只差详情页",
    newOnes.length === 1 && newOnes[0].issue.includes("详情页"),
    `新增风格的问题：${newOnes.map((p) => p.issue).join("、")}；全库共 ${afterAdd.problems.length} 处`);

  const setCats = JSON.parse(await callTool("set_style_categories", { id: "test-style", categories: ["minimal", "art"] }));
  check("set_style_categories", setCats.categories.length === 2 && setCats.categories[1].name === "艺术装饰",
    JSON.stringify(setCats.categories.map((c) => c.id)));

  const badCat = await call("tools/call", { name: "set_style_categories", arguments: { id: "test-style", categories: ["nope"] } });
  check("未知分类会报错", badCat.result?.isError === true, text(badCat).slice(0, 60));

  const released = JSON.parse(await callTool("release", {
    version: "9.9.9",
    highlight: "测试一次发版。",
    notes: ["条目一", "条目二"],
  }));
  const pkg = JSON.parse(await readFile(join(sandbox, "package.json"), "utf8"));
  const docsHtml = await readFile(join(sandbox, "docs/docs.html"), "utf8");
  check("release", pkg.version === "9.9.9" && docsHtml.includes("v9.9.9") && docsHtml.includes("本次更新主要看：测试一次发版。"),
    `版本 ${pkg.version}`);

  const badArgs = await call("tools/call", { name: "get_style_doc", arguments: {} });
  check("缺参数会报错", badArgs.result?.isError === true, text(badArgs).slice(0, 60));

  const unknown = await call("tools/call", { name: "nope", arguments: {} });
  check("未知工具会报错", unknown.result?.isError === true, text(unknown).slice(0, 40));

  child.kill();
  await rm(sandbox, { recursive: true, force: true });

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} 通过`);
  if (failed.length) process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
