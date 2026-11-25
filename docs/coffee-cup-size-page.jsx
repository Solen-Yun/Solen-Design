import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/coffee-cup-size-demo.jsx";
import sources from "./components/coffee-cup-size-sources.jsx";
import coffeeCupSize from "./components/coffee-cup-size.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...coffeeCupSize} Demo={Demo} {...sources} />,
);
