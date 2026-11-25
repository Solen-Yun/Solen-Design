import { defineConfig } from "vite";

// Dev server for the local component gallery. The library itself (src/)
// stays zero-build plain CSS.
//
// root is the project root so that `../src/index.css` resolves to a real
// file inside the served tree — with root = "docs/" that path fell outside
// the server root and Vite answered with HTML instead of CSS.
export default defineConfig({
  root: ".",
  // esbuild defaults to the classic JSX runtime, which needs React in
  // scope; the automatic one is what React 17+ expects.
  esbuild: {
    jsx: "automatic",
  },
  server: {
    open: "/docs/",
    watch: {
      // The AI artifacts are generated files — watching them only costs
      // rebuilds (and locks the folders on Windows). The build outputs are
      // ignored for the same reason: a dev-server watcher holding handles
      // on dist folders makes every rebuild's emptyOutDir fail with EPERM
      // and leaves the directories unreachable afterwards.
      // "docs-dist" does not match the "dist*" pattern, so it is listed
      // separately — otherwise `npm run build:docs` fails with EPERM
      // while the dev server is running.
      ignored: ["**/ai/**", "**/dist*/**", "**/docs-dist/**"],
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/react/index.js",
      name: "SolenDesign",
      formats: ["es", "cjs"],
      fileName: (format) => (format === "es" ? "react.js" : "react.cjs"),
    },
    rollupOptions: {
      external: (id) => [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "motion",
        "motion/react",
        "gsap",
      ].includes(id) || id === "three" || id.startsWith("three/"),
    },
  },
});
