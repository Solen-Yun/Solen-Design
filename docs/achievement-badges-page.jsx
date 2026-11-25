import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/achievement-badges-demo.jsx";
import sources from "./components/achievement-badges-sources.jsx";
import achievementBadges from "./components/achievement-badges.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...achievementBadges} Demo={Demo} {...sources} />,
);
