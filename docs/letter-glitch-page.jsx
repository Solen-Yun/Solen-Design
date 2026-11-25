import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/letter-glitch-demo.jsx";
import sources from "./components/letter-glitch-sources.jsx";
import letterGlitch from "./components/letter-glitch.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...letterGlitch} Demo={Demo} {...sources} />,
);
