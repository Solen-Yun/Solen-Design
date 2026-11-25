import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/star-border-demo.jsx";
import sources from "./components/star-border-sources.jsx";
import starBorder from "./components/star-border.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...starBorder} Demo={Demo} {...sources} />,
);
