import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/rotating-text-demo.jsx";
import sources from "./components/rotating-text-sources.jsx";
import rotatingText from "./components/rotating-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...rotatingText} Demo={Demo} {...sources} />,
);
