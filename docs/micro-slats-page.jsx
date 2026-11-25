import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/micro-slats-demo.jsx";
import sources from "./components/micro-slats-sources.jsx";
import microSlats from "./components/micro-slats.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...microSlats} Demo={Demo} {...sources} />,
);
