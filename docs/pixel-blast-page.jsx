import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-blast-demo.jsx";
import sources from "./components/pixel-blast-sources.jsx";
import pixelBlast from "./components/pixel-blast.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelBlast} Demo={Demo} {...sources} />,
);
