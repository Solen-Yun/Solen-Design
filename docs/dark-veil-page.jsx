import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/dark-veil-demo.jsx";
import sources from "./components/dark-veil-sources.jsx";
import darkVeil from "./components/dark-veil.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...darkVeil} Demo={Demo} {...sources} />,
);
