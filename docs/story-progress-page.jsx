import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/story-progress-demo.jsx";
import sources from "./components/story-progress-sources.jsx";
import storyProgress from "./components/story-progress.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...storyProgress} Demo={Demo} {...sources} />,
);
