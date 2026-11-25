import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/falling-text-demo.jsx";
import sources from "./components/falling-text-sources.jsx";
import fallingText from "./components/falling-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fallingText} Demo={Demo} {...sources} />,
);
