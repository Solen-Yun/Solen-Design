import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dither-veil-demo.jsx";
import sources from "./components/dither-veil-sources.jsx";
import ditherVeil from "./components/dither-veil.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ditherVeil} Demo={Demo} {...sources} />,
);
