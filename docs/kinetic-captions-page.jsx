import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/kinetic-captions-demo.jsx";
import sources from "./components/kinetic-captions-sources.jsx";
import kineticCaptions from "./components/kinetic-captions.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...kineticCaptions} Demo={Demo} {...sources} />,
);
