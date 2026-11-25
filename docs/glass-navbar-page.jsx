import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glass-navbar-demo.jsx";
import sources from "./components/glass-navbar-sources.jsx";
import glassNavbar from "./components/glass-navbar.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glassNavbar} Demo={Demo} {...sources} />,
);
