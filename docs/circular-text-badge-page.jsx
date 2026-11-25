import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/circular-text-badge-demo.jsx";
import sources from "./components/circular-text-badge-sources.jsx";
import circularTextBadge from "./components/circular-text-badge.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...circularTextBadge} Demo={Demo} {...sources} />,
);
