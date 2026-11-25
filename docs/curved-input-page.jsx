import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/curved-input-demo.jsx";
import sources from "./components/curved-input-sources.jsx";
import curvedInput from "./components/curved-input.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...curvedInput} Demo={Demo} {...sources} />,
);
