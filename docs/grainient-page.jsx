import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/grainient-demo.jsx";
import sources from "./components/grainient-sources.jsx";
import grainient from "./components/grainient.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...grainient} Demo={Demo} {...sources} />,
);
