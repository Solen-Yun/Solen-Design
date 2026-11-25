import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/split-curtain-menu-demo.jsx";
import sources from "./components/split-curtain-menu-sources.jsx";
import splitCurtainMenu from "./components/split-curtain-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...splitCurtainMenu} Demo={Demo} {...sources} />,
);
