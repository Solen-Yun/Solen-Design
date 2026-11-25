import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ascii-text-demo.jsx";
import sources from "./components/ascii-text-sources.jsx";
import asciiText from "./components/ascii-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...asciiText} Demo={Demo} {...sources} />,
);
