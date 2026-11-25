import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/growth-bubbles-demo.jsx";
import sources from "./components/growth-bubbles-sources.jsx";
import growthBubbles from "./components/growth-bubbles.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...growthBubbles} Demo={Demo} {...sources} />,
);
