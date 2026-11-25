import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/integration-orbit-demo.jsx";
import sources from "./components/integration-orbit-sources.jsx";
import integrationOrbit from "./components/integration-orbit.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...integrationOrbit} Demo={Demo} {...sources} />,
);
