import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/rubber-segment-demo.jsx";
import sources from "./components/rubber-segment-sources.jsx";
import rubberSegment from "./components/rubber-segment.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...rubberSegment} Demo={Demo} {...sources} />,
);
