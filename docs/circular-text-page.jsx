import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/circular-text-demo.jsx";
import sources from "./components/circular-text-sources.jsx";
import circularText from "./components/circular-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...circularText} Demo={Demo} {...sources} />,
);
