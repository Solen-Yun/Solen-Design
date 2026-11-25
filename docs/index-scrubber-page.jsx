import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/index-scrubber-demo.jsx";
import sources from "./components/index-scrubber-sources.jsx";
import indexScrubber from "./components/index-scrubber.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...indexScrubber} Demo={Demo} {...sources} />,
);
