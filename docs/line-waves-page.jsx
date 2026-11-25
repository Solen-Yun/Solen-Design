import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/line-waves-demo.jsx";
import sources from "./components/line-waves-sources.jsx";
import lineWaves from "./components/line-waves.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lineWaves} Demo={Demo} {...sources} />,
);
