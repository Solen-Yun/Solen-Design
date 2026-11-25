import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/silk-demo.jsx";
import sources from "./components/silk-sources.jsx";
import silk from "./components/silk.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...silk} Demo={Demo} {...sources} />,
);
