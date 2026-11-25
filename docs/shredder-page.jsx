import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shredder-demo.jsx";
import sources from "./components/shredder-sources.jsx";
import shredder from "./components/shredder.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shredder} Demo={Demo} {...sources} />,
);
