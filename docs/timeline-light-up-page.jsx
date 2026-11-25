import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/timeline-light-up-demo.jsx";
import sources from "./components/timeline-light-up-sources.jsx";
import timelineLightUp from "./components/timeline-light-up.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...timelineLightUp} Demo={Demo} {...sources} />,
);
