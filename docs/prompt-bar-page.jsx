import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/prompt-bar-demo.jsx";
import sources from "./components/prompt-bar-sources.jsx";
import promptBar from "./components/prompt-bar.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...promptBar} Demo={Demo} {...sources} />,
);
