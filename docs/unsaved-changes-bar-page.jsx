import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/unsaved-changes-bar-demo.jsx";
import sources from "./components/unsaved-changes-bar-sources.jsx";
import unsavedChangesBar from "./components/unsaved-changes-bar.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...unsavedChangesBar} Demo={Demo} {...sources} />,
);
