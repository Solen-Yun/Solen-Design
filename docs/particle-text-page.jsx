import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/particle-text-demo.jsx";
import sources from "./components/particle-text-sources.jsx";
import particleText from "./components/particle-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...particleText} Demo={Demo} {...sources} />,
);
