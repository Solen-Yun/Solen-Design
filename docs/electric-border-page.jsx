import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/electric-border-demo.jsx";
import sources from "./components/electric-border-sources.jsx";
import electricBorder from "./components/electric-border.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...electricBorder} Demo={Demo} {...sources} />,
);
