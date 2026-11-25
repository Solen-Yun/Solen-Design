import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/warp-text-demo.jsx";
import sources from "./components/warp-text-sources.jsx";
import warpText from "./components/warp-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...warpText} Demo={Demo} {...sources} />,
);
