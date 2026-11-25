import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/mega-menu-morph-demo.jsx";
import sources from "./components/mega-menu-morph-sources.jsx";
import megaMenuMorph from "./components/mega-menu-morph.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...megaMenuMorph} Demo={Demo} {...sources} />,
);
