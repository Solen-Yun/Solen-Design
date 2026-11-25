import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/compare-tray-demo.jsx";
import sources from "./components/compare-tray-sources.jsx";
import compareTray from "./components/compare-tray.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...compareTray} Demo={Demo} {...sources} />,
);
