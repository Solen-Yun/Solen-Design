import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glow-cursor-demo.jsx";
import sources from "./components/glow-cursor-sources.jsx";
import glowCursor from "./components/glow-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glowCursor} Demo={Demo} {...sources} />,
);
