import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/magnet-lines-demo.jsx";
import sources from "./components/magnet-lines-sources.jsx";
import magnetLines from "./components/magnet-lines.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...magnetLines} Demo={Demo} {...sources} />,
);
