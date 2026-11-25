import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/balatro-demo.jsx";
import sources from "./components/balatro-sources.jsx";
import balatro from "./components/balatro.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...balatro} Demo={Demo} {...sources} />,
);
