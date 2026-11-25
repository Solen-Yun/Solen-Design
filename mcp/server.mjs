#!/usr/bin/env node
/* Solen Design 的 MCP 服务。
   让任何 agent 直接查这套目录、拿设计文档与组件源码，或者直接改目录。

   协议：JSON-RPC 2.0 over stdio，每行一条消息。自己实现是为了零依赖 ——
   拿到仓库（或装上 npm 包）就能跑，不用先 npm install。 */

import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ROOT,
  readStyles,
  readCategories,
  readStyleDoc,
  readComponentCatalog,
  readComponent,
  auditCatalog,
  addStyle,
  setStyleCategories,
  release,
} from "./catalog.mjs";

const SERVER_NAME = "solen-design";
const SERVER_VERSION = "1.0.0";
const PROTOCOL_VERSIONS = ["2025-11-25", "2025-06-18", "2025-03-26", "2024-11-05", "2024-10-07"];
const DEFAULT_PROTOCOL = "2025-03-26";

const json = (value) => JSON.stringify(value, null, 2);
const readJson = async (rel) => JSON.parse(await readFile(join(ROOT, rel), "utf8"));

/* ---------------- 工具 ---------------- */

const TOOLS = [
  {
    name: "list_categories",
    title: "列出分类",
    description:
      "列出网站风格目录的分类表：视觉风格与布局模式各一组分类，每个分类带命中数量。新增风格时先看这张表，决定它归到哪一类。",
    inputSchema: { type: "object", properties: {} },
    handler: async () => {
      const [styles, tables] = await Promise.all([readStyles(), readCategories()]);
      const counts = {};
      for (const s of styles) for (const c of s.categories) counts[c] = (counts[c] ?? 0) + 1;
      const group = (key) =>
        tables[key].map((c) => ({ id: c.id, name: c.name, count: counts[c.id] ?? 0 }));
      return json({
        visual: group("visual"),
        layout: group("layout"),
        note: "一套风格可以同时属于多个分类；分类 id 就是目录卡上的 data-cat。",
      });
    },
  },
  {
    name: "search_styles",
    title: "搜风格",
    description:
      "按关键词搜网站风格目录。关键词会匹配中文名、英文名、简介、标签和分类。返回风格 id、所属分组、分类、设计文档路径与详情页路径。",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "关键词；留空则列出全部" },
        collection: { type: "string", enum: ["visual", "layout"], description: "只看视觉风格或只看布局模式" },
        category: { type: "string", description: "只看某个分类（分类 id 见 list_categories）" },
        limit: { type: "number", minimum: 1, maximum: 200, description: "最多返回几条，默认 20" },
      },
    },
    handler: async ({ query, collection, category, limit = 20 }) => {
      const styles = await readStyles();
      const q = (query ?? "").trim().toLowerCase();
      const hit = styles.filter((s) => {
        if (collection && s.collection !== collection) return false;
        if (category && !s.categories.includes(category)) return false;
        if (!q) return true;
        const hay = [s.id, s.nameZh, s.nameEn, s.desc, ...s.tags, ...s.categories].join(" ").toLowerCase();
        return hay.includes(q);
      });
      return json({
        total: hit.length,
        styles: hit.slice(0, limit).map((s) => ({
          id: s.id,
          name: s.nameZh,
          nameEn: s.nameEn,
          collection: s.collection,
          categories: s.categories,
          desc: s.desc,
          tags: s.tags,
          doc: s.doc,
          page: s.page,
        })),
      });
    },
  },
  {
    name: "get_style_doc",
    title: "取风格设计文档",
    description:
      "取一套风格的完整设计文档（复现提示词）。这是这套风格唯一的事实来源：照着它写出来的界面，和站上的展示页一致。",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "风格 id，例如 neo-brutalist" },
        lang: { type: "string", enum: ["zh", "en"], description: "文档语言，默认中文" },
      },
      required: ["id"],
    },
    handler: async ({ id, lang = "zh" }) => readStyleDoc(id, lang),
  },
  {
    name: "search_components",
    title: "搜组件",
    description:
      "按关键词搜组件库（464 个组件）。关键词会匹配组件名、说明与正文。返回组件 id、名称、简介与详情页地址。",
    inputSchema: {
      type: "object",
      properties: {
        query: { type: "string", description: "关键词；留空则列出全部" },
        limit: { type: "number", minimum: 1, maximum: 200, description: "最多返回几条，默认 20" },
      },
    },
    handler: async ({ query, limit = 20 }) => {
      const [index, catalog] = await Promise.all([
        readJson("ai/search-index.json"),
        readComponentCatalog(),
      ]);
      const byId = new Map(catalog.map((c) => [c.id, c]));
      const q = (query ?? "").trim().toLowerCase();
      const rows = index.components.filter((c) => !q || c.text.toLowerCase().includes(q));
      return json({
        total: rows.length,
        components: rows.slice(0, limit).map((c) => ({
          id: c.id,
          name: c.name,
          description: byId.get(c.id)?.description ?? "",
          docsUrl: byId.get(c.id)?.docsUrl ?? `/docs/${c.id}.html`,
        })),
      });
    },
  },
  {
    name: "get_component",
    title: "取组件规格",
    description:
      "取一个组件的完整规格：复现提示词（prompt）、props 表（api）和框架源码（source）。实现一套新的界面时照抄这里的内容。",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "组件 id，例如 gooey-nav" },
        include: {
          type: "string",
          enum: ["prompt", "api", "source", "all"],
          description: "要哪一部分，默认 prompt",
        },
        framework: {
          type: "string",
          enum: ["react", "vue", "svelte", "solid", "preact", "vanilla"],
          description: "源码要哪个框架，默认 react",
        },
      },
      required: ["id"],
    },
    handler: async ({ id, include = "prompt", framework = "react" }) => {
      const component = await readComponent(id);
      if (include === "prompt") return component.prompt ?? "";
      if (include === "api") return json(component.api ?? []);
      /* 源码不在组件条目里，按框架另有一份：ai/packages/<id>/<framework>.json */
      const key = (component.frameworks ?? []).find(
        (f) => f.id?.toLowerCase() === framework.toLowerCase() || f.name?.toLowerCase() === framework.toLowerCase()
      );
      if (!key) {
        throw new Error(`没有 ${framework} 这一版，只有：${(component.frameworks ?? []).map((f) => f.name).join("、")}`);
      }
      const pkg = await readJson(`ai/packages/${id}/${key.id ?? framework}.json`);
      const source = (pkg.files ?? []).map((f) => `// ${f.name}\n${f.code}`).join("\n\n");
      if (include === "source") return source;
      return [
        `# ${component.name}`,
        "",
        "## 复现提示词",
        component.prompt ?? "",
        "",
        "## Props",
        json(component.api ?? []),
        "",
        `## 源码（${pkg.frameworkName ?? key.name}）`,
        source,
      ].join("\n");
    },
  },
  {
    name: "audit_catalog",
    title: "目录体检",
    description:
      "检查整个风格目录的一致性：设计文档（中/英）、详情页、目录卡分类标记、llms.txt 索引行是否齐全，有没有孤儿文件。新增风格后跑一次。",
    inputSchema: { type: "object", properties: {} },
    handler: async () => {
      const { styles, problems } = await auditCatalog();
      return json({ styles, problems, ok: problems.length === 0 });
    },
  },
  {
    name: "add_style",
    title: "新增一套风格",
    description:
      "新增一套网站风格：写中英双语设计文档、往目录页加卡片（带分类）、往 llms.txt 加索引行。详情页与它的 CSS 是逐套手写的，这一步不代劳，工具会告诉你还差什么。",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "风格 id，小写连字符，例如 brutalist-web" },
        nameZh: { type: "string", description: "中文名" },
        nameEn: { type: "string", description: "英文名" },
        collection: { type: "string", enum: ["visual", "layout"], description: "视觉风格还是布局模式" },
        categories: { type: "array", items: { type: "string" }, description: "分类 id 列表，见 list_categories" },
        descZh: { type: "string", description: "一句话简介（中文）" },
        descEn: { type: "string", description: "一句话简介（英文）" },
        tags: { type: "array", items: { type: "string" }, description: "卡片标签，3–4 个" },
        theme: { type: "string", enum: ["light", "dark"], description: "这套风格的整体明暗" },
        colors: {
          type: "array",
          description: "色板：每项 { name, value, token, role }",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              value: { type: "string" },
              token: { type: "string" },
              role: { type: "string" },
            },
            required: ["name", "value"],
          },
        },
      },
      required: ["id", "nameZh", "nameEn", "collection", "categories", "descZh", "descEn", "tags", "theme"],
    },
    handler: async (args) => json(await addStyle(args)),
  },
  {
    name: "set_style_categories",
    title: "改风格分类",
    description: "改一套风格在目录卡上的分类（data-cat）。分类 id 必须已在分类表里。",
    inputSchema: {
      type: "object",
      properties: {
        id: { type: "string", description: "风格 id" },
        categories: { type: "array", items: { type: "string" }, description: "新的分类 id 列表" },
      },
      required: ["id", "categories"],
    },
    handler: async ({ id, categories }) => json(await setStyleCategories(id, categories)),
  },
  {
    name: "release",
    title: "发版",
    description:
      "发一个新版本：改 package.json 的版本号，在更新日志最前面插一条（带「本次更新主要看」提要行）。条目用计数表达增量，不逐个报名字。",
    inputSchema: {
      type: "object",
      properties: {
        version: { type: "string", description: "新版本号 x.y.z；留空则沿用当前版本号" },
        highlight: { type: "string", description: "「本次更新主要看：」后面那句话" },
        notes: { type: "array", items: { type: "string" }, description: "更新日志的条目" },
      },
      required: ["highlight", "notes"],
    },
    handler: async (args) => json(await release(args)),
  },
];

/* ---------------- 参数校验 ---------------- */

/* 只校验这套 schema 用到的能力：必填、类型、枚举、数组元素类型。 */
function validate(schema, args) {
  const value = args ?? {};
  if (value && typeof value !== "object") return "参数必须是一个对象";
  for (const key of schema.required ?? []) {
    if (value[key] === undefined || value[key] === null) return `缺少参数 ${key}`;
  }
  for (const [key, spec] of Object.entries(schema.properties ?? {})) {
    const item = value[key];
    if (item === undefined || item === null) continue;
    const type = Array.isArray(spec.type) ? spec.type[0] : spec.type;
    if (type === "string" && typeof item !== "string") return `参数 ${key} 要字符串`;
    if (type === "number" && typeof item !== "number") return `参数 ${key} 要数字`;
    if (type === "boolean" && typeof item !== "boolean") return `参数 ${key} 要布尔`;
    if (type === "array" && !Array.isArray(item)) return `参数 ${key} 要数组`;
    if (type === "object" && (typeof item !== "object" || Array.isArray(item))) return `参数 ${key} 要对象`;
    if (spec.enum && !spec.enum.includes(item)) return `参数 ${key} 只能是 ${spec.enum.join("、")}`;
    if (spec.type === "array" && spec.items?.type === "string") {
      if (item.some((x) => typeof x !== "string")) return `参数 ${key} 的每一项都要字符串`;
    }
    /* 上限写在 schema 里就按它截断 —— agent 传一个 limit: 10000 不该把
       整个目录塞进上下文。 */
    if (type === "number" && spec.maximum !== undefined && item > spec.maximum) {
      return `参数 ${key} 最大 ${spec.maximum}`;
    }
    if (type === "number" && spec.minimum !== undefined && item < spec.minimum) {
      return `参数 ${key} 最小 ${spec.minimum}`;
    }
  }
  return null;
}

/* ---------------- JSON-RPC ---------------- */

let negotiated = DEFAULT_PROTOCOL;

function send(message) {
  process.stdout.write(JSON.stringify(message) + "\n");
}

function reply(id, result) {
  send({ jsonrpc: "2.0", id, result });
}

function fail(id, code, message) {
  send({ jsonrpc: "2.0", id, error: { code, message } });
}

async function callTool(name, args) {
  const tool = TOOLS.find((t) => t.name === name);
  if (!tool) throw new Error(`没有这个工具：${name}`);
  const problem = validate(tool.inputSchema, args);
  if (problem) throw new Error(problem);
  const text = await tool.handler(args ?? {});
  return { content: [{ type: "text", text: typeof text === "string" ? text : json(text) }] };
}

async function handle(message) {
  const { id, method, params } = message;
  const isRequest = id !== undefined && id !== null;

  if (method === "initialize") {
    const asked = params?.protocolVersion;
    negotiated = PROTOCOL_VERSIONS.includes(asked) ? asked : DEFAULT_PROTOCOL;
    if (!isRequest) return;
    return reply(id, {
      protocolVersion: negotiated,
      capabilities: { tools: { listChanged: false } },
      serverInfo: { name: SERVER_NAME, version: SERVER_VERSION },
    });
  }

  if (method === "notifications/initialized" || method === "initialized") return;

  if (method === "ping") {
    if (isRequest) reply(id, {});
    return;
  }

  if (method === "tools/list") {
    if (!isRequest) return;
    return reply(id, {
      tools: TOOLS.map(({ name, title, description, inputSchema }) => ({
        name,
        title,
        description,
        inputSchema,
      })),
    });
  }

  if (method === "tools/call") {
    if (!isRequest) return;
    try {
      return reply(id, await callTool(params?.name, params?.arguments));
    } catch (error) {
      /* 工具自己的失败要作为结果返回（isError），不是协议层错误。 */
      return reply(id, {
        content: [{ type: "text", text: String(error?.message ?? error) }],
        isError: true,
      });
    }
  }

  if (method === "resources/list") {
    if (!isRequest) return;
    return reply(id, { resources: [] });
  }

  if (method === "prompts/list") {
    if (!isRequest) return;
    return reply(id, { prompts: [] });
  }

  if (isRequest) fail(id, -32601, `不支持的方法：${method}`);
}

let buffer = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let cut;
  while ((cut = buffer.indexOf("\n")) >= 0) {
    const line = buffer.slice(0, cut).trim();
    buffer = buffer.slice(cut + 1);
    if (!line) continue;
    let message;
    try {
      message = JSON.parse(line);
    } catch {
      continue;
    }
    handle(message).catch((error) => {
      if (message?.id !== undefined && message?.id !== null) {
        fail(message.id, -32603, String(error?.message ?? error));
      }
    });
  }
});
process.stdin.on("end", () => process.exit(0));
