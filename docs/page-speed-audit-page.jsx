import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/page-speed-audit-demo.jsx";
import sources from "./components/page-speed-audit-sources.jsx";
import pageSpeedAudit from "./components/page-speed-audit.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pageSpeedAudit} Demo={Demo} {...sources} />,
);
