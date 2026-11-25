import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/text-on-wave-path-demo.jsx";
import sources from "./components/text-on-wave-path-sources.jsx";
import textOnWavePath from "./components/text-on-wave-path.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...textOnWavePath} Demo={Demo} {...sources} />,
);
