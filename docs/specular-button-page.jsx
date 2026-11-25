import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/specular-button-demo.jsx";
import sources from "./components/specular-button-sources.jsx";
import specularButton from "./components/specular-button.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...specularButton} Demo={Demo} {...sources} />,
);
