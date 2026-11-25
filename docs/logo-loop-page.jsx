import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/logo-loop-demo.jsx";
import sources from "./components/logo-loop-sources.jsx";
import logoLoop from "./components/logo-loop.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...logoLoop} Demo={Demo} {...sources} />,
);
