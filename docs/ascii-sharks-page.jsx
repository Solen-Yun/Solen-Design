import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ascii-sharks-demo.jsx";
import sources from "./components/ascii-sharks-sources.jsx";
import asciiSharks from "./components/ascii-sharks.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...asciiSharks} Demo={Demo} {...sources} />,
);
