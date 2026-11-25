import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ballpit-demo.jsx";
import sources from "./components/ballpit-sources.jsx";
import ballpit from "./components/ballpit.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ballpit} Demo={Demo} {...sources} />,
);
