import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/split-flap-text-demo.jsx";
import sources from "./components/split-flap-text-sources.jsx";
import splitFlapText from "./components/split-flap-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...splitFlapText} Demo={Demo} {...sources} />,
);
