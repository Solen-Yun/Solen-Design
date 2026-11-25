import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/counter-demo.jsx";
import sources from "./components/counter-sources.jsx";
import counter from "./components/counter.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...counter} Demo={Demo} {...sources} />,
);
