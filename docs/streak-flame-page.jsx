import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/streak-flame-demo.jsx";
import sources from "./components/streak-flame-sources.jsx";
import streakFlame from "./components/streak-flame.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...streakFlame} Demo={Demo} {...sources} />,
);
