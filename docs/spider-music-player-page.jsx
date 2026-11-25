import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/spider-music-player-demo.jsx";
import sources from "./components/spider-music-player-sources.jsx";
import spiderMusicPlayer from "./components/spider-music-player.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...spiderMusicPlayer} Demo={Demo} {...sources} />,
);
