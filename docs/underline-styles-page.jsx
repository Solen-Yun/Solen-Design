import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/underline-styles-demo.jsx";
import sources from "./components/underline-styles-sources.jsx";
import underlineStyles from "./components/underline-styles.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...underlineStyles} Demo={Demo} {...sources} />,
);
