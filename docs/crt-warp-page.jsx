import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/crt-warp-demo.jsx";
import sources from "./components/crt-warp-sources.jsx";
import crtWarp from "./components/crt-warp.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...crtWarp} Demo={Demo} {...sources} />,
);
