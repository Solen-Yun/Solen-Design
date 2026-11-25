import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/map-pin-drop-demo.jsx";
import sources from "./components/map-pin-drop-sources.jsx";
import mapPinDrop from "./components/map-pin-drop.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...mapPinDrop} Demo={Demo} {...sources} />,
);
