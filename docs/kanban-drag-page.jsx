import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/kanban-drag-demo.jsx";
import sources from "./components/kanban-drag-sources.jsx";
import kanbanDrag from "./components/kanban-drag.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...kanbanDrag} Demo={Demo} {...sources} />,
);
