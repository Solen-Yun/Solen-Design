import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/prize-wheel-demo.jsx";
import sources from "./components/prize-wheel-sources.jsx";
import prizeWheel from "./components/prize-wheel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...prizeWheel} Demo={Demo} {...sources} />,
);
