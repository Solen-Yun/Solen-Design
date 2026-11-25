import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scanner-demo.jsx";
import sources from "./components/scanner-sources.jsx";
import scanner from "./components/scanner.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scanner} Demo={Demo} {...sources} />,
);
