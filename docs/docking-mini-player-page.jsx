import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/docking-mini-player-demo.jsx";
import sources from "./components/docking-mini-player-sources.jsx";
import dockingMiniPlayer from "./components/docking-mini-player.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dockingMiniPlayer} Demo={Demo} {...sources} />,
);
