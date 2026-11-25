import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/folder-float-demo.jsx";
import sources from "./components/folder-float-sources.jsx";
import folderFloat from "./components/folder-float.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...folderFloat} Demo={Demo} {...sources} />,
);
