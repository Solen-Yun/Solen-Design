import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/video-text-title-demo.jsx";
import sources from "./components/video-text-title-sources.jsx";
import videoTextTitle from "./components/video-text-title.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...videoTextTitle} Demo={Demo} {...sources} />,
);
