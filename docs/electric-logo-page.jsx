import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/electric-logo-demo.jsx";
import sources from "./components/electric-logo-sources.jsx";
import electricLogo from "./components/electric-logo.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...electricLogo} Demo={Demo} {...sources} />,
);
