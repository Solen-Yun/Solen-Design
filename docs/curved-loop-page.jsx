import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/curved-loop-demo.jsx";
import sources from "./components/curved-loop-sources.jsx";
import curvedLoop from "./components/curved-loop.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...curvedLoop} Demo={Demo} {...sources} />,
);
