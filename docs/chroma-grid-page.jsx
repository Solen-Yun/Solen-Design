import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/chroma-grid-demo.jsx";
import sources from "./components/chroma-grid-sources.jsx";
import chromaGrid from "./components/chroma-grid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...chromaGrid} Demo={Demo} {...sources} />,
);
