import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-swap-demo.jsx";
import sources from "./components/pixel-swap-sources.jsx";
import pixelSwap from "./components/pixel-swap.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelSwap} Demo={Demo} {...sources} />,
);
