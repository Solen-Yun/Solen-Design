import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/section-color-shift-demo.jsx";
import sources from "./components/section-color-shift-sources.jsx";
import sectionColorShift from "./components/section-color-shift.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sectionColorShift} Demo={Demo} {...sources} />,
);
