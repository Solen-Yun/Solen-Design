import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/stack-demo.jsx";
import sources from "./components/stack-sources.jsx";
import stack from "./components/stack.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stack} Demo={Demo} {...sources} />,
);
