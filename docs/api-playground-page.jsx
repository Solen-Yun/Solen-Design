import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/api-playground-demo.jsx";
import sources from "./components/api-playground-sources.jsx";
import apiPlayground from "./components/api-playground.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...apiPlayground} Demo={Demo} {...sources} />,
);
