import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/card-nav-demo.jsx";
import sources from "./components/card-nav-sources.jsx";
import cardNav from "./components/card-nav.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cardNav} Demo={Demo} {...sources} />,
);
