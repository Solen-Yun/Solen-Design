import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bell-toggle-demo.jsx";
import sources from "./components/bell-toggle-sources.jsx";
import bellToggle from "./components/bell-toggle.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...bellToggle} Demo={Demo} {...sources} />,
);
