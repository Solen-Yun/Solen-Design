import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/branched-menu-demo.jsx";
import sources from "./components/branched-menu-sources.jsx";
import branchedMenu from "./components/branched-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...branchedMenu} Demo={Demo} {...sources} />,
);
