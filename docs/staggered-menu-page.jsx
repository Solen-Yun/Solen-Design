import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/staggered-menu-demo.jsx";
import sources from "./components/staggered-menu-sources.jsx";
import staggeredMenu from "./components/staggered-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...staggeredMenu} Demo={Demo} {...sources} />,
);
