import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ghost-cursor-demo.jsx";
import sources from "./components/ghost-cursor-sources.jsx";
import ghostCursor from "./components/ghost-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ghostCursor} Demo={Demo} {...sources} />,
);
