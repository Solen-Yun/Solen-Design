import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/beams-demo.jsx";
import sources from "./components/beams-sources.jsx";
import beams from "./components/beams.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...beams} Demo={Demo} {...sources} />,
);
