import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/target-cursor-demo.jsx";
import sources from "./components/target-cursor-sources.jsx";
import targetCursor from "./components/target-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...targetCursor} Demo={Demo} {...sources} />,
);
