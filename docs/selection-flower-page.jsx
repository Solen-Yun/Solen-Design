import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/selection-flower-demo.jsx";
import sources from "./components/selection-flower-sources.jsx";
import selectionFlower from "./components/selection-flower.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...selectionFlower} Demo={Demo} {...sources} />,
);
