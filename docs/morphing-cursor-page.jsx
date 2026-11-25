import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/morphing-cursor-demo.jsx";
import sources from "./components/morphing-cursor-sources.jsx";
import morphingCursor from "./components/morphing-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...morphingCursor} Demo={Demo} {...sources} />,
);
