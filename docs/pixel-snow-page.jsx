import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-snow-demo.jsx";
import sources from "./components/pixel-snow-sources.jsx";
import pixelSnow from "./components/pixel-snow.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelSnow} Demo={Demo} {...sources} />,
);
