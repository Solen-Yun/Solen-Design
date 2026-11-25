import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/folder-demo.jsx";
import sources from "./components/folder-sources.jsx";
import folder from "./components/folder.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...folder} Demo={Demo} {...sources} />,
);
