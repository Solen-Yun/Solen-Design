import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/tilt-to-flat-screen-demo.jsx";
import sources from "./components/tilt-to-flat-screen-sources.jsx";
import tiltToFlatScreen from "./components/tilt-to-flat-screen.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...tiltToFlatScreen} Demo={Demo} {...sources} />,
);
