import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/starfield-warp-demo.jsx";
import sources from "./components/starfield-warp-sources.jsx";
import starfieldWarp from "./components/starfield-warp.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...starfieldWarp} Demo={Demo} {...sources} />,
);
