import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/stack-to-fan-demo.jsx";
import sources from "./components/stack-to-fan-sources.jsx";
import stackToFan from "./components/stack-to-fan.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stackToFan} Demo={Demo} {...sources} />,
);
