import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/comet-dial-demo.jsx";
import sources from "./components/comet-dial-sources.jsx";
import cometDial from "./components/comet-dial.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cometDial} Demo={Demo} {...sources} />,
);
