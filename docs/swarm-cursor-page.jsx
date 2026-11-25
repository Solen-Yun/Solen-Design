import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/swarm-cursor-demo.jsx";
import sources from "./components/swarm-cursor-sources.jsx";
import swarmCursor from "./components/swarm-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...swarmCursor} Demo={Demo} {...sources} />,
);
