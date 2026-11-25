/* Solen Design 目录的数据层。
   风格目录在 docs/style.html（手写的卡片），设计文档在 docs/styles/<id>.md，
   组件的机器可读面在 ai/（npm run ai:build 生成），更新日志在 docs/docs.html。
   根目录由本文件位置推出 —— 仓库里是仓库根，装成 npm 包时是包根。 */

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = process.env.SOLEN_ROOT
  ? resolve(process.env.SOLEN_ROOT)
  : resolve(dirname(fileURLToPath(import.meta.url)), "..");

const read = (rel) => readFile(join(ROOT, rel), "utf8");
const write = (rel, text) => writeFile(join(ROOT, rel), text, "utf8");
const has = (rel) => existsSync(join(ROOT, rel));

/* ---------------- 风格目录 ---------------- */

/* 目录卡是手写 HTML，没有索引文件，只能从页面里读回来。
   切在两个 grid 之间：visual 的卡片在前，layout 的在后。 */
export async function readStyles() {
  const html = await read("docs/style.html");
  const cut = html.indexOf('<section class="style-grid" data-collection="layout"');
  if (cut < 0) throw new Error("docs/style.html 里找不到布局模式的分组标记");

  const pick = (text, collection) =>
    text
      .split('<a class="style-card"')
      .slice(1)
      .map((chunk) => {
        /* 一张卡的正文到它自己的 </a> 为止 —— 不然会串到下一张卡上。 */
        const card = chunk.split("\n        </a>")[0];
        const id = /href="style-([a-z0-9-]+)\.html"/.exec(card)?.[1];
        if (!id) return null;
        const name = /style-card-name">([^<]*)<span class="style-card-en">([^<]*)</.exec(card);
        const desc = /style-card-desc">([^<]*)</.exec(card)?.[1] ?? "";
        /* 标签是标签行里的一串 <span>文字</span>；标签行之后卡里再没有别的
           <span>，所以从标签行往后扫到卡尾即可，不必跟结束标签配对。 */
        const tagStart = card.indexOf('class="style-card-tags">');
        const tags =
          tagStart < 0 ? [] : [...card.slice(tagStart).matchAll(/<span>([^<]*)<\/span>/g)].map((m) => m[1]);
        const categories = (/\sdata-cat="([^"]*)"/.exec(card)?.[1] ?? "").split(/\s+/).filter(Boolean);
        return {
          id,
          collection,
          nameZh: name?.[1]?.trim() ?? "",
          nameEn: name?.[2]?.trim() ?? "",
          desc,
          tags,
          categories,
          doc: `docs/styles/${id}.md`,
          page: `docs/style-${id}.html`,
        };
      })
      .filter(Boolean);

  return [...pick(html.slice(0, cut), "visual"), ...pick(html.slice(cut), "layout")];
}

/* 分类表在 docs/style-field.js 的 CATEGORIES 里 —— 它是唯一事实来源，
   分类 chip 的计数也是从卡片的 data-cat 实算的。 */
export async function readCategories() {
  const js = await read("docs/style-field.js");
  const start = js.indexOf("const CATEGORIES = {");
  if (start < 0) throw new Error("docs/style-field.js 里找不到 CATEGORIES");
  const block = js.slice(start, js.indexOf("const COLLECTION_LABEL"));
  const tables = {};
  for (const m of block.matchAll(/(visual|layout):\s*\[([\s\S]*?)\n\s*\],/g)) {
    tables[m[1]] = [...m[2].matchAll(/\["([a-z0-9]+)",\s*"([^"]+)"\]/g)].map(([, id, name]) => ({ id, name }));
  }
  if (!tables.visual || !tables.layout) throw new Error("docs/style-field.js 的 CATEGORIES 结构变了，需要同步 mcp/catalog.mjs");
  return tables;
}

export async function readStyleDoc(id, lang = "zh") {
  const file = lang === "en" ? `docs/styles/${id}.en.md` : `docs/styles/${id}.md`;
  if (!has(file)) throw new Error(`没有这份设计文档：${file}`);
  return read(file);
}

/* ---------------- 组件 ---------------- */

export async function readComponentCatalog() {
  const catalog = JSON.parse(await read("ai/catalog.json"));
  return catalog.components ?? [];
}

export async function readComponent(id) {
  const file = `ai/components/${id}.json`;
  if (!has(file)) throw new Error(`没有这个组件：${id}（先跑 npm run ai:build）`);
  return JSON.parse(await read(file));
}

/* ---------------- 一致性体检 ---------------- */

export async function auditCatalog() {
  const styles = await readStyles();
  const categories = await readCategories();
  const known = new Set([...categories.visual, ...categories.layout].map((c) => c.id));
  const llms = await read("llms.txt");
  const problems = [];

  for (const style of styles) {
    if (!has(`docs/styles/${style.id}.md`)) problems.push({ id: style.id, issue: "缺中文设计文档", path: `docs/styles/${style.id}.md` });
    if (!has(`docs/styles/${style.id}.en.md`)) problems.push({ id: style.id, issue: "缺英文设计文档", path: `docs/styles/${style.id}.en.md` });
    if (!has(`docs/style-${style.id}.html`)) problems.push({ id: style.id, issue: "缺详情页", path: `docs/style-${style.id}.html` });
    if (!style.categories.length) problems.push({ id: style.id, issue: "目录卡没有分类标记（data-cat）" });
    for (const c of style.categories) {
      if (!known.has(c)) problems.push({ id: style.id, issue: `分类 ${c} 不在分类表里` });
    }
    if (!llms.includes(`docs/styles/${style.id}.md`)) problems.push({ id: style.id, issue: "llms.txt 缺索引行" });
  }

  /* 反向：文档在、目录里没有的孤儿 */
  const inCatalog = new Set(styles.map((s) => s.id));
  for (const file of await listFiles("docs/styles")) {
    if (!file.endsWith(".md") || file.endsWith(".en.md")) continue;
    const id = file.replace(/\.md$/, "");
    if (!inCatalog.has(id)) problems.push({ id, issue: "有设计文档但目录里没有卡片" });
  }

  /* llms.txt 里列了、目录里没有的 */
  for (const m of llms.matchAll(/docs\/styles\/([a-z0-9-]+)\.md/g)) {
    if (!inCatalog.has(m[1])) problems.push({ id: m[1], issue: "llms.txt 列了但目录里没有卡片" });
  }

  return { styles: styles.length, problems };
}

async function listFiles(dir) {
  const { readdir } = await import("node:fs/promises");
  try {
    return await readdir(join(ROOT, dir));
  } catch {
    return [];
  }
}

/* ---------------- 写目录 ---------------- */

/* 目录卡的骨架。缩略图留给作者手写 —— 每套风格的缩略图长得都不一样，
   这里先放一个中性占位。 */
const CARD_TEMPLATE = (s) => `        <a class="style-card" href="style-${s.id}.html" data-cat="${s.categories.join(" ")}">
          <span class="style-card-thumb new-thumb" aria-hidden="true">
            <span class="new-thumb-slab"></span>
          </span>
          <span class="style-card-body">
            <span class="style-card-name">${s.nameZh} <span class="style-card-en">${s.nameEn}</span></span>
            <span class="style-card-desc">${s.descZh}</span>
            <span class="style-card-tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</span>
          </span>
        </a>
`;

export async function addStyle(style) {
  const conflicts = [];
  if (has(`docs/styles/${style.id}.md`)) conflicts.push(`docs/styles/${style.id}.md 已存在`);
  if (has(`docs/styles/${style.id}.en.md`)) conflicts.push(`docs/styles/${style.id}.en.md 已存在`);
  if (has(`docs/style-${style.id}.html`)) conflicts.push(`docs/style-${style.id}.html 已存在`);
  if (conflicts.length) throw new Error(`这套风格已经有一半在了，先看看缺什么：${conflicts.join("、")}`);

  const categories = await readCategories();
  const known = new Set(categories[style.collection].map((c) => c.id));
  const unknown = style.categories.filter((c) => !known.has(c));
  if (unknown.length) throw new Error(`分类 ${unknown.join("、")} 不在${style.collection}的分类表里，先用 set_style_categories 登记`);

  await write(`docs/styles/${style.id}.md`, zhDoc(style));
  await write(`docs/styles/${style.id}.en.md`, enDoc(style));

  /* 目录卡：插到对应分组的末尾 */
  const html = await read("docs/style.html");
  const marker = `<section class="style-grid" data-collection="${style.collection}"`;
  const start = html.indexOf(marker);
  const end = html.indexOf("</section>", start);
  const next = html.slice(0, end) + "\n" + CARD_TEMPLATE(style) + html.slice(end);
  await write("docs/style.html", next);

  /* llms.txt：加一行索引，插在风格列表的第一条 */
  const llms = await read("llms.txt");
  const line = `- ${style.nameZh}（${style.id}）— docs/styles/${style.id}.md`;
  const anchor = llms.indexOf("## 网站风格");
  const first = llms.indexOf("\n- ", anchor);
  if (first < 0) throw new Error("llms.txt 里找不到风格索引段");
  const insert = llms.indexOf("\n", first + 1);
  await write("llms.txt", llms.slice(0, insert + 1) + line + "\n" + llms.slice(insert + 1));

  return {
    written: [`docs/styles/${style.id}.md`, `docs/styles/${style.id}.en.md`, "docs/style.html（目录卡）", "llms.txt（索引行）"],
    remaining: [
      `写详情页 docs/style-${style.id}.html（参考同类的现成页面）`,
      `在 docs/style.css 里写这套风格的缩略图与详情页皮肤`,
      "把 docs/styles/<id>.md 里的占位段落补完（提示词要逐字可用）",
    ],
  };
}

/* 改分类：改目录卡上的 data-cat。 */
export async function setStyleCategories(id, categoryIds) {
  const categories = await readCategories();
  const known = new Map([...categories.visual, ...categories.layout].map((c) => [c.id, c]));
  const unknown = categoryIds.filter((c) => !known.has(c));
  if (unknown.length) {
    throw new Error(`分类 ${unknown.join("、")} 不在分类表里。现有分类：${[...known.keys()].join("、")}`);
  }
  const html = await read("docs/style.html");
  const re = new RegExp(`(<a class="style-card" href="style-${id}\\.html")( data-cat="[^"]*")?`);
  if (!re.test(html)) throw new Error(`目录里没有 ${id} 这套风格`);
  await write("docs/style.html", html.replace(re, `$1 data-cat="${categoryIds.join(" ")}"`));
  return { id, categories: categoryIds.map((c) => ({ id: c, name: known.get(c).name })) };
}

/* 发版：bump 版本号 + 在更新日志最前面插一条。 */
export async function release({ version, highlight, notes }) {
  const pkg = JSON.parse(await read("package.json"));
  if (version && version !== pkg.version) {
    if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error("版本号要写成 x.y.z");
    pkg.version = version;
    await write("package.json", JSON.stringify(pkg, null, 2) + "\n");
    /* lock 里的版本号跟着走 —— 不同步的话 lock 会停在旧版本上。
       装成 npm 包时没有 lock 文件，跳过即可。 */
    if (has("package-lock.json")) {
      const lock = JSON.parse(await read("package-lock.json"));
      lock.version = version;
      if (lock.packages?.[""]) lock.packages[""].version = version;
      await write("package-lock.json", JSON.stringify(lock, null, 2) + "\n");
    }
  }

  const docs = await read("docs/docs.html");
  const anchor = docs.indexOf('<h3>v', docs.indexOf('data-doc="更新日志"'));
  const now = new Date();
  const date = `${now.getFullYear()} 年 ${now.getMonth() + 1} 月 ${now.getDate()} 日`;
  const block =
    `          <h3>v${pkg.version} — ${date}</h3>\n` +
    `          <p class="changelog-hl">本次更新主要看：${highlight}</p>\n` +
    `          <ul>\n${notes.map((n) => `            <li>${n}</li>`).join("\n")}\n          </ul>\n`;
  await write("docs/docs.html", docs.slice(0, anchor) + block + docs.slice(anchor));

  return { version: pkg.version, entry: block.trim() };
}

/* ---------------- 设计文档骨架 ---------------- */

const zhDoc = (s) => `# ${s.nameZh} — 风格参考

> ${s.descZh}

**Theme:** ${s.theme}

这套风格的设计文档。下面的每一节都要写实：色值、字号、行高、圆角、阴影、交互态都要给出可直接落地的数值。

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
${(s.colors ?? []).map((c) => `| ${c.name} | \`${c.value}\` | \`--color-${c.token}\` | ${c.role} |`).join("\n") || "| — | — | — | 待填 |"}

## Typography

### sans-serif — 标题

- **Substitute:** 待填
- **Weights:** 待填
- **Sizes:** 待填
- **Line height:** 待填
- **Letter spacing:** 待填

### mono — 正文、标签与数据

- **Substitute:** 待填
- **Weights:** 待填
- **Sizes:** 待填
- **Line height:** 待填
- **Letter spacing:** 待填

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | sans-serif | 待填 | 待填 | 待填 | 待填 | \`--text-display\` |
| heading | sans-serif | 待填 | 待填 | 待填 | 待填 | \`--text-heading\` |
| body | mono | 待填 | 待填 | 待填 | 待填 | \`--text-body\` |
| label | mono | 待填 | 待填 | 待填 | 待填 | \`--text-label\` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | \`--spacing-8\` |
| 16 | 16px | \`--spacing-16\` |
| 24 | 24px | \`--spacing-24\` |
| 32 | 32px | \`--spacing-32\` |
| 48 | 48px | \`--spacing-48\` |
| 64 | 64px | \`--spacing-64\` |

### Border Radius

| Element | Value |
|---|---|
| cards | 待填 |
| buttons | 待填 |
| inputs | 待填 |
| badges | 待填 |

- **Page max-width:** 待填
- **Section gap:** 待填
- **Card padding:** 待填
- **Element gap:** 待填

## Components

### 待填的组件名

**Role:** 待填

写清楚这个组件长什么样、什么状态、怎么响应交互。

- **Sizes:** 待填
- **States:** 待填

## Do's and Don'ts

### Do

- 待填

### Don't

- 待填

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | 待填 | 待填 | 页面画布 |
| 1 | 待填 | 待填 | 次级面板 |

## Elevation

- 待填

## Imagery

待填：用什么图像、不用什么图像，规则写死。

## Layout

待填：栏数、容器宽度、区块间距、对齐方式。

## Agent Prompt Guide

### Implementation Contract

- 以用户请求中的页面、用户任务和真实内容为依据，只实施指定范围；标明缺失的业务信息，不编造数据或能力。
- 先检查现有项目、技术栈与组件；沿用项目结构、路由和依赖，复用已有组件，不重建未要求的页面或功能。
- 沿用项目断点，调整窄屏与桌面的网格和留白；保留信息层级，避免意外横向溢出。
- 对本次涉及的交互，处理键盘焦点与减少动态效果；补齐适用的禁用、加载、空内容与错误状态。
- 完成后按项目现有脚本检查，仅报告实际运行的测试与视觉检查，并列出未验证项。

QUICK COLOR REFERENCE:

- text: \`${(s.colors ?? [])[0]?.value ?? "#000000"}\`
- background: \`#ffffff\`
- border: \`#000000\`
- accent: \`${(s.colors ?? [])[1]?.value ?? "#000000"}\`
- hoverFill: \`${(s.colors ?? [])[2]?.value ?? "#000000"}\`
- secondaryPanel: \`#f4f4f4\`

EXAMPLE COMPONENT PROMPTS:

1. 待填
`;

const enDoc = (s) => `# ${s.nameEn} — Style Reference

> ${s.descEn}

**Theme:** ${s.theme}

This is the design document for the style. Every section must be concrete: color values, type sizes, line heights, radii, shadows and interaction states all have to be numbers an implementer can apply directly.

## Colors

| Name | Value | Token | Role |
|---|---|---|---|
${(s.colors ?? []).map((c) => `| ${c.name} | \`${c.value}\` | \`--color-${c.token}\` | ${c.role} |`).join("\n") || "| — | — | — | TODO |"}

## Typography

### sans-serif — headings

- **Substitute:** TODO
- **Weights:** TODO
- **Sizes:** TODO
- **Line height:** TODO
- **Letter spacing:** TODO

### mono — body copy, labels and data

- **Substitute:** TODO
- **Weights:** TODO
- **Sizes:** TODO
- **Line height:** TODO
- **Letter spacing:** TODO

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|---|---|---|---|---|---|---|
| display | sans-serif | TODO | TODO | TODO | TODO | \`--text-display\` |
| heading | sans-serif | TODO | TODO | TODO | TODO | \`--text-heading\` |
| body | mono | TODO | TODO | TODO | TODO | \`--text-body\` |
| label | mono | TODO | TODO | TODO | TODO | \`--text-label\` |

## Spacing & Layout

**Base unit:** 8px
**Density:** compact

### Spacing Scale

| Name | Value | Token |
|---|---|---|
| 8 | 8px | \`--spacing-8\` |
| 16 | 16px | \`--spacing-16\` |
| 24 | 24px | \`--spacing-24\` |
| 32 | 32px | \`--spacing-32\` |
| 48 | 48px | \`--spacing-48\` |
| 64 | 64px | \`--spacing-64\` |

### Border Radius

| Element | Value |
|---|---|
| cards | TODO |
| buttons | TODO |
| inputs | TODO |
| badges | TODO |

- **Page max-width:** TODO
- **Section gap:** TODO
- **Card padding:** TODO
- **Element gap:** TODO

## Components

### TODO component

**Role:** TODO

Describe what it looks like, its states and how it responds to interaction.

- **Sizes:** TODO
- **States:** TODO

## Do's and Don'ts

### Do

- TODO

### Don't

- TODO

## Surfaces

| Level | Name | Value | Purpose |
|---|---|---|---|
| 0 | TODO | TODO | Page canvas |
| 1 | TODO | TODO | Secondary panels |

## Elevation

- TODO

## Imagery

TODO: which imagery to use, which to avoid, and the rule that decides it.

## Layout

TODO: column count, container width, section gaps, alignment.

## Agent Prompt Guide

### Implementation Contract

- Implement only the requested scope based on the user's request, the task and real content; flag missing business information and never invent data or capabilities.
- Inspect the existing project, stack and components first; follow the project's structure, routing and dependencies, reuse existing components, and don't rebuild pages or features nobody asked for.
- Follow the project's breakpoints; adapt grids and whitespace for narrow screens and desktop; preserve the information hierarchy and avoid accidental horizontal overflow.
- For every interaction involved, handle keyboard focus and reduced motion; fill in disabled, loading, empty and error states where applicable.
- When done, run the project's existing scripts; report only the tests and visual checks you actually ran, and list what remains unverified.

QUICK COLOR REFERENCE:

- text: \`${(s.colors ?? [])[0]?.value ?? "#000000"}\`
- background: \`#ffffff\`
- border: \`#000000\`
- accent: \`${(s.colors ?? [])[1]?.value ?? "#000000"}\`
- hoverFill: \`${(s.colors ?? [])[2]?.value ?? "#000000"}\`
- secondaryPanel: \`#f4f4f4\`

EXAMPLE COMPONENT PROMPTS:

1. TODO
`;
