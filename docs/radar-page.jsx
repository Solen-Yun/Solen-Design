import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/radar-demo.jsx";
import sources from "./components/radar-sources.jsx";
import radar from "./components/radar.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...radar} Demo={Demo} {...sources} />,
);
