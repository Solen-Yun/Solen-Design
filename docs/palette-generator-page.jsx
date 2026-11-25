import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/palette-generator-demo.jsx";
import sources from "./components/palette-generator-sources.jsx";
import paletteGenerator from "./components/palette-generator.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...paletteGenerator} Demo={Demo} {...sources} />,
);
