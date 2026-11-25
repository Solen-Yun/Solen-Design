import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/regrouping-bubbles-demo.jsx";
import sources from "./components/regrouping-bubbles-sources.jsx";
import regroupingBubbles from "./components/regrouping-bubbles.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...regroupingBubbles} Demo={Demo} {...sources} />,
);
