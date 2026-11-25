import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/orb-demo.jsx";
import sources from "./components/orb-sources.jsx";
import orb from "./components/orb.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...orb} Demo={Demo} {...sources} />,
);
