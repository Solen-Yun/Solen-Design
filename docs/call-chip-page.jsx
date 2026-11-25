import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/call-chip-demo.jsx";
import sources from "./components/call-chip-sources.jsx";
import callChip from "./components/call-chip.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...callChip} Demo={Demo} {...sources} />,
);
