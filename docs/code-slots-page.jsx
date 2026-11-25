import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/code-slots-demo.jsx";
import sources from "./components/code-slots-sources.jsx";
import codeSlots from "./components/code-slots.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...codeSlots} Demo={Demo} {...sources} />,
);
