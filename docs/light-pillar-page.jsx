import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/light-pillar-demo.jsx";
import sources from "./components/light-pillar-sources.jsx";
import lightPillar from "./components/light-pillar.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lightPillar} Demo={Demo} {...sources} />,
);
