import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/install-command-tabs-demo.jsx";
import sources from "./components/install-command-tabs-sources.jsx";
import installCommandTabs from "./components/install-command-tabs.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...installCommandTabs} Demo={Demo} {...sources} />,
);
