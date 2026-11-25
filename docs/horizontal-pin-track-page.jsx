import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/horizontal-pin-track-demo.jsx";
import sources from "./components/horizontal-pin-track-sources.jsx";
import horizontalPinTrack from "./components/horizontal-pin-track.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...horizontalPinTrack} Demo={Demo} {...sources} />,
);
