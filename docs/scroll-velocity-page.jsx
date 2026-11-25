import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-velocity-demo.jsx";
import sources from "./components/scroll-velocity-sources.jsx";
import scrollVelocity from "./components/scroll-velocity.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollVelocity} Demo={Demo} {...sources} />,
);
