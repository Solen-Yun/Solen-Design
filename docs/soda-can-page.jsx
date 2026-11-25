import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/soda-can-demo.jsx";
import sources from "./components/soda-can-sources.jsx";
import sodaCan from "./components/soda-can.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sodaCan} Demo={Demo} {...sources} />,
);
