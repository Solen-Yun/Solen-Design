import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/animated-content-demo.jsx";
import sources from "./components/animated-content-sources.jsx";
import animatedContent from "./components/animated-content.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...animatedContent} Demo={Demo} {...sources} />,
);
