import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/advent-doors-demo.jsx";
import sources from "./components/advent-doors-sources.jsx";
import adventDoors from "./components/advent-doors.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...adventDoors} Demo={Demo} {...sources} />,
);
