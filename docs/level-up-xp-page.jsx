import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/level-up-xp-demo.jsx";
import sources from "./components/level-up-xp-sources.jsx";
import levelUpXp from "./components/level-up-xp.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...levelUpXp} Demo={Demo} {...sources} />,
);
