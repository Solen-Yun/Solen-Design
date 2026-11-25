import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ripple-distortion-demo.jsx";
import sources from "./components/ripple-distortion-sources.jsx";
import rippleDistortion from "./components/ripple-distortion.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...rippleDistortion} Demo={Demo} {...sources} />,
);
