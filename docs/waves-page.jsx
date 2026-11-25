import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/waves-demo.jsx";
import sources from "./components/waves-sources.jsx";
import waves from "./components/waves.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...waves} Demo={Demo} {...sources} />,
);
