import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/lanyard-demo.jsx";
import sources from "./components/lanyard-sources.jsx";
import lanyard from "./components/lanyard.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lanyard} Demo={Demo} {...sources} />,
);
