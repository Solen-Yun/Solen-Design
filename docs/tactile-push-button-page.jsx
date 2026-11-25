import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/tactile-push-button-demo.jsx";
import sources from "./components/tactile-push-button-sources.jsx";
import tactilePushButton from "./components/tactile-push-button.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...tactilePushButton} Demo={Demo} {...sources} />,
);
