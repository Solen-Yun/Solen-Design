# Solen Design

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/mark-01-v2-reverse.svg">
  <img src="docs/assets/mark-01-v2-accent.svg" alt="Solen Design" width="88" height="88" align="right">
</picture>

A cool, minimal design system: plain CSS at its core, with framework entries for React, Vue, Svelte, Solid, Preact and vanilla DOM.

> Calm porcelain neutrals, a quiet steel-blue accent, light & dark built in.

## Install

```sh
npm install solen-design
```

## Usage

CSS entry — everything ships in cascade layers, so your own CSS always wins:

```html
<link rel="stylesheet" href="node_modules/solen-design/src/index.css">
```

That entry is the tokens and the base layer. Most components carry their styles inside the engine and need nothing more; the ones with a stylesheet of their own are collected into one file at build time:

```jsx
import "solen-design/src/index.css";         // tokens + base
import "solen-design/dist/solen-design.css";  // component styles
```

React components (React DOM >= 18 as peer dependency):

```jsx
import { PixelToggle } from "solen-design/react";
```

Vue, Svelte, Solid, Preact and vanilla DOM entries share the same engine, so behaviour and props are identical. Each one is a barrel file like the React entry — import the component by name:

```jsx
import { PixelToggle } from "solen-design/vue";
```

The vanilla entry names every component's `mount()` after it, because one package cannot export `mount` 246 times:

```ts
import { mountPixelToggle } from "solen-design/vanilla";
```

## Theming

Tokens are plain CSS variables — override any of them. Light & dark are one system via `light-dark()` and follow `color-scheme`:

```css
:root { --sd-accent: teal; }
```

## Docs

464 components live in `src/components/`, with live demos in the docs workbench. AI tools: read `llms.txt` — a 21KB index — then pull only the component you need from `ai/components/<id>.json`. The catalogue (`ai/catalog.json`) and the keyword index (`ai/search-index.json`) are kept apart, so an agent can look one component up without loading the whole registry. Component prompts and source ship verbatim.

Run the workbench locally (Node.js required, no other services):

```sh
npm install
npm run build:docs   # bundled & minified site → docs-dist/
npm run preview      # → http://localhost:4173/docs/
```

If you want to modify the components or the workbench itself, use the dev server instead (`npm run dev` → `http://localhost:5173/docs/`).

## MCP

An MCP server ships with the package, so any agent can use this catalogue directly — search the styles, pull a design document or a component's spec, or edit the catalogue. Node is enough; there is nothing to install.

```json
{
  "mcpServers": {
    "solen-design": {
      "command": "node",
      "args": ["node_modules/solen-design/mcp/server.mjs"]
    }
  }
}
```

From a clone, point it at `mcp/server.mjs` instead — the editing tools need the full repository. `mcp/README.md` lists the config for each client. A ready-made agent skill (`.agents/skills/solen-design/`) teaches agents without MCP how to drive the catalogue — copy that folder into your project's `.agents/skills/`.

## License

[MIT](LICENSE)
