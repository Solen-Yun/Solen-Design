import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bubble-menu-demo.jsx";
import sources from "./components/bubble-menu-sources.jsx";
import bubbleMenu from "./components/bubble-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...bubbleMenu} Demo={Demo} {...sources} />,
);
