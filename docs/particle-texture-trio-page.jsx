import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/particle-texture-trio-demo.jsx";
import sources from "./components/particle-texture-trio-sources.jsx";
import particleTextureTrio from "./components/particle-texture-trio.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...particleTextureTrio} Demo={Demo} {...sources} />,
);
