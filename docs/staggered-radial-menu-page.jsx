import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/staggered-radial-menu-demo.jsx";
import sources from "./components/staggered-radial-menu-sources.jsx";
import staggeredRadialMenu from "./components/staggered-radial-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...staggeredRadialMenu} Demo={Demo} {...sources} />,
);
