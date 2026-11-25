import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/prism-demo.jsx";
import sources from "./components/prism-sources.jsx";
import prism from "./components/prism.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...prism} Demo={Demo} {...sources} />,
);
