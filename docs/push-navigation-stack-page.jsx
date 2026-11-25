import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/push-navigation-stack-demo.jsx";
import sources from "./components/push-navigation-stack-sources.jsx";
import pushNavigationStack from "./components/push-navigation-stack.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pushNavigationStack} Demo={Demo} {...sources} />,
);
