import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glass-folder-demo.jsx";
import sources from "./components/glass-folder-sources.jsx";
import glassFolder from "./components/glass-folder.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glassFolder} Demo={Demo} {...sources} />,
);
