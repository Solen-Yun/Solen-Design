import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/infinite-menu-demo.jsx";
import sources from "./components/infinite-menu-sources.jsx";
import infiniteMenu from "./components/infinite-menu.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...infiniteMenu} Demo={Demo} {...sources} />,
);
