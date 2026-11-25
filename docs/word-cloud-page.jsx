import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/word-cloud-demo.jsx";
import sources from "./components/word-cloud-sources.jsx";
import wordCloud from "./components/word-cloud.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...wordCloud} Demo={Demo} {...sources} />,
);
