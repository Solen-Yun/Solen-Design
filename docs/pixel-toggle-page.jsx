import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-toggle-demo.jsx";
import sources from "./components/pixel-toggle-sources.jsx";
import pixelToggle from "./components/pixel-toggle.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelToggle} Demo={Demo} {...sources} />,
);
