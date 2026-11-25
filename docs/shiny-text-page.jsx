import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shiny-text-demo.jsx";
import sources from "./components/shiny-text-sources.jsx";
import shinyText from "./components/shiny-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shinyText} Demo={Demo} {...sources} />,
);
