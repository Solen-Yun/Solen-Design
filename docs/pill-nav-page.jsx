import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pill-nav-demo.jsx";
import sources from "./components/pill-nav-sources.jsx";
import pillNav from "./components/pill-nav.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pillNav} Demo={Demo} {...sources} />,
);
