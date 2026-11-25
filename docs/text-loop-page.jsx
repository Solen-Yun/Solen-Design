import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/text-loop-demo.jsx";
import sources from "./components/text-loop-sources.jsx";
import textLoop from "./components/text-loop.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...textLoop} Demo={Demo} {...sources} />,
);
