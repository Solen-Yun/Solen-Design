import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/paper-crumple-demo.jsx";
import sources from "./components/paper-crumple-sources.jsx";
import paperCrumple from "./components/paper-crumple.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...paperCrumple} Demo={Demo} {...sources} />,
);
