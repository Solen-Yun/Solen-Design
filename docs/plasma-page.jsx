import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/plasma-demo.jsx";
import sources from "./components/plasma-sources.jsx";
import plasma from "./components/plasma.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...plasma} Demo={Demo} {...sources} />,
);
