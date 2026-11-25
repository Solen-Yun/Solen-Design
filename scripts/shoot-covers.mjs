/* 生成组件画廊的静态封面。

   画廊卡片不再挂演示——四百多张卡各挂一个真组件，就是网格越滚越卡的
   原因。这里用无头浏览器把每个组件的画廊卡预览（CardPreview）截成
   PNG，存到 docs/assets/cover/<id>.png，画廊改挂这些图。

   用法：
     npm run covers              全部组件
     npm run covers -- flip-card 只截指定的几个（调试用）  */

import { createServer } from "vite";
import { existsSync } from "node:fs";
import { mkdir, readdir, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "docs/assets/cover");

/* 卡片宽度，截图台按它排版，出图按 2 倍像素密度。 */
const CARD_WIDTH = 250;
/* JPEG 质量。全量 465 张在 80 时约 17MB，想更小就调低重跑。 */
const QUALITY = 80;
/* 等场景落定再截图的时间。 */
const SETTLE_MS = 320;
/* 每截多少个重载一次页面：WebGL 上下文有数量上限，不重载会丢上下文。 */
const BATCH = 10;

/* 用本机已装的浏览器，不下载浏览器内核。 */
const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
];
const executablePath = BROWSERS.find((p) => existsSync(p));
if (!executablePath) {
  throw new Error("没找到本机的 Edge 或 Chrome");
}

const only = process.argv.slice(2);
const server = await createServer({
  root,
  server: { open: false, port: 5199, strictPort: true },
  logLevel: "error",
});
await server.listen();
/* 用 localhost：Vite 默认只绑 IPv6 的 ::1，127.0.0.1 连不上。 */
const base = `http://localhost:5199`;

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const context = await browser.newContext({
  viewport: { width: CARD_WIDTH, height: 480 },
  deviceScaleFactor: 2,
  reducedMotion: "reduce",
});
const page = await context.newPage();

/* 组件 id 就是演示文件名：画廊挂的是 components/<id>-demo.jsx。
   不去加载画廊页——那要连带转换四百多个组件模块，慢到没必要。 */
let ids = (await readdir(resolve(root, "docs/components")))
  .filter((f) => f.endsWith("-demo.jsx"))
  .map((f) => f.slice(0, -"-demo.jsx".length));
if (only.length) ids = ids.filter((id) => only.includes(id));
console.log(`要截 ${ids.length} 个组件`);

const shotUrl = `${base}/docs/cover-shot-preview.html`;
const openShot = async () => {
  await page.goto(shotUrl, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForFunction(() => typeof window.showCover === "function", null, {
    timeout: 120000,
  });
};

const failed = [];
let done = 0;
await openShot();
for (const id of ids) {
  try {
    await page.evaluate((cid) => window.showCover(cid), id);
    await page.waitForTimeout(SETTLE_MS);
    await page
      .locator("#stage .comp-zoom")
      .screenshot({ path: resolve(outDir, `${id}.jpg`), type: "jpeg", quality: QUALITY });
  } catch (err) {
    /* Vite 首次遇到新的依赖会重载页面，执行上下文就没了：重开再试一次。 */
    try {
      await openShot();
      await page.evaluate((cid) => window.showCover(cid), id);
      await page.waitForTimeout(SETTLE_MS);
      await page
        .locator("#stage .comp-zoom")
        .screenshot({ path: resolve(outDir, `${id}.jpg`), type: "jpeg", quality: QUALITY });
    } catch (err2) {
      /* 有文件名字叫 -demo.jsx，内容却是组件登记信息，不是演示模块：
         跳过，不算失败。 */
      if (!err2.message.includes("没有导出 CardPreview")) {
        failed.push(`${id}: ${err2.message.split("\n")[0]}`);
      }
    }
  }
  done++;
  /* 每 BATCH 个重载一次：WebGL 上下文有数量上限，不重载会丢上下文。 */
  if (done % BATCH === 0) await openShot();
  if (done % 25 === 0) console.log(`${done}/${ids.length}`);
}

await browser.close();
await server.close();

const files = await readdir(outDir);
let bytes = 0;
for (const f of files) {
  bytes += (await stat(resolve(outDir, f))).size;
}
console.log(`完成：${files.length} 个文件，共 ${(bytes / 1024 / 1024).toFixed(1)}MB`);
if (failed.length) {
  console.log(`失败 ${failed.length} 个：`);
  for (const f of failed) console.log("  " + f);
}
