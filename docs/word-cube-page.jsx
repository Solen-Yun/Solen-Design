import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/word-cube-demo.jsx";
import sources from "./components/word-cube-sources.jsx";
import wordCube from "./components/word-cube.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...wordCube} Demo={Demo} {...sources} />,
);
