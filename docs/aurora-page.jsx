import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/aurora-demo.jsx";
import sources from "./components/aurora-sources.jsx";
import aurora from "./components/aurora.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...aurora} Demo={Demo} {...sources} />,
);
