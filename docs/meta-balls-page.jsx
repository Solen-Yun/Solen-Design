import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/meta-balls-demo.jsx";
import sources from "./components/meta-balls-sources.jsx";
import metaBalls from "./components/meta-balls.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...metaBalls} Demo={Demo} {...sources} />,
);
