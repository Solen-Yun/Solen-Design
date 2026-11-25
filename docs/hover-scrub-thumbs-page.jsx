import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hover-scrub-thumbs-demo.jsx";
import sources from "./components/hover-scrub-thumbs-sources.jsx";
import hoverScrubThumbs from "./components/hover-scrub-thumbs.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...hoverScrubThumbs} Demo={Demo} {...sources} />,
);
