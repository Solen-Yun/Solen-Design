import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bottom-sheet-detents-demo.jsx";
import sources from "./components/bottom-sheet-detents-sources.jsx";
import bottomSheetDetents from "./components/bottom-sheet-detents.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...bottomSheetDetents} Demo={Demo} {...sources} />,
);
