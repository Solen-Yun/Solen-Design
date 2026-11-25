import { fileURLToPath } from "node:url";
import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

// Docs site production build: multi-page HTML inputs, static output in
// dist-docs/ that any static host can serve. Lives in its own config
// because lib mode (vite.config.js) and MPA input can't share one
// `vite build` run.

const root = fileURLToPath(new URL(".", import.meta.url));

/* Every page under docs/ except the *-preview.html harnesses — they are
   dev-only sandboxes and nothing in the deployed site links to them. */
const docsInputs = Object.fromEntries(
  readdirSync("docs")
    .filter((f) => f.endsWith(".html") && !f.endsWith("-preview.html"))
    .map((f) => [f.replace(/\.html$/, ""), resolve(root, "docs", f)]),
);

export default defineConfig({
  root: ".",
  esbuild: {
    jsx: "automatic",
  },
  publicDir: false,
  build: {
    outDir: "docs-dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        ...docsInputs,
      },
    },
  },
  plugins: [
    (() => {
      /* Runtime JS builds asset URLs as plain strings ("assets/mark-…svg",
         QR codes, wallpapers), which the bundler never rewrites — so the
         real files must exist next to the pages. HTML-referenced assets
         are hashed into <outDir>/assets by Vite itself; this copy keeps
         the relative paths from chrome.js / style-field.js working.
         Plain copyFile recursion — fs.cpSync has been observed leaving
         the target directory with broken ACLs on this Windows setup. */
      let target;
      const copyDir = (src, dest) => {
        mkdirSync(dest, { recursive: true });
        for (const entry of readdirSync(src, { withFileTypes: true })) {
          const from = resolve(src, entry.name);
          const to = resolve(dest, entry.name);
          if (entry.isDirectory()) copyDir(from, to);
          else copyFileSync(from, to);
        }
      };
      /* The build has just emptied the output folder; on Windows the
         directory can still hold a handle for a moment, and mkdir then
         fails with EPERM. Waiting for the handle to go is simpler than
         fighting it. */
      const copyWhenReady = (src, dest) => {
        const copy = () => {
          try {
            copyDir(src, dest);
          } catch (error) {
            if (error.code !== "EPERM") throw error;
            setTimeout(copy, 200);
          }
        };
        copy();
      };
      return {
        name: "copy-docs-assets",
        apply: "build",
        configResolved(config) {
          target = resolve(root, config.build.outDir);
        },
        closeBundle() {
          copyWhenReady(resolve(root, "docs/assets"), resolve(target, "docs/assets"));
          /* The style pages fetch their design document at runtime
             ("./styles/<id>.md" and ".en.md"), so the documents have to sit
             next to the built pages or the panel says "文档加载失败。" */
          copyWhenReady(resolve(root, "docs/styles"), resolve(target, "docs/styles"));
        },
      };
    })(),
  ],
});
