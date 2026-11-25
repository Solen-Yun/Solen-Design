import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/status-mark-demo.jsx";
import sources from "./components/status-mark-sources.jsx";
import statusMark from "./components/status-mark.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...statusMark} Demo={Demo} {...sources} />,
);
