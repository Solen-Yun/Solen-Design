import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glass-icons-demo.jsx";
import sources from "./components/glass-icons-sources.jsx";
import glassIcons from "./components/glass-icons.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glassIcons} Demo={Demo} {...sources} />,
);
