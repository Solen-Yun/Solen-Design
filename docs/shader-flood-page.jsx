import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shader-flood-demo.jsx";
import sources from "./components/shader-flood-sources.jsx";
import shaderFlood from "./components/shader-flood.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shaderFlood} Demo={Demo} {...sources} />,
);
