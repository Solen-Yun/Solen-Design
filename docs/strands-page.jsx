import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/strands-demo.jsx";
import sources from "./components/strands-sources.jsx";
import strands from "./components/strands.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...strands} Demo={Demo} {...sources} />,
);
