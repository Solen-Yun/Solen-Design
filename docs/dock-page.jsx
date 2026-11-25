import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dock-demo.jsx";
import sources from "./components/dock-sources.jsx";
import dock from "./components/dock.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dock} Demo={Demo} {...sources} />,
);
