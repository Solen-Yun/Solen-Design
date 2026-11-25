import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/drag-to-trash-demo.jsx";
import sources from "./components/drag-to-trash-sources.jsx";
import dragToTrash from "./components/drag-to-trash.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dragToTrash} Demo={Demo} {...sources} />,
);
