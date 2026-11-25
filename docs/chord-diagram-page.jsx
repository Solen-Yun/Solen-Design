import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/chord-diagram-demo.jsx";
import sources from "./components/chord-diagram-sources.jsx";
import chordDiagram from "./components/chord-diagram.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...chordDiagram} Demo={Demo} {...sources} />,
);
