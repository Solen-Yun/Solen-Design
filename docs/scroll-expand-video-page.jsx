import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-expand-video-demo.jsx";
import sources from "./components/scroll-expand-video-sources.jsx";
import scrollExpandVideo from "./components/scroll-expand-video.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollExpandVideo} Demo={Demo} {...sources} />,
);
