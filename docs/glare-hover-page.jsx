import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glare-hover-demo.jsx";
import sources from "./components/glare-hover-sources.jsx";
import glareHover from "./components/glare-hover.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glareHover} Demo={Demo} {...sources} />,
);
