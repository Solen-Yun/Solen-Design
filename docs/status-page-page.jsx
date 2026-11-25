import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/status-page-demo.jsx";
import sources from "./components/status-page-sources.jsx";
import statusPage from "./components/status-page.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...statusPage} Demo={Demo} {...sources} />,
);
