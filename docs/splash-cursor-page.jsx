import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/splash-cursor-demo.jsx";
import sources from "./components/splash-cursor-sources.jsx";
import splashCursor from "./components/splash-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...splashCursor} Demo={Demo} {...sources} />,
);
