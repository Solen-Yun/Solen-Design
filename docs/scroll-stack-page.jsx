import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-stack-demo.jsx";
import sources from "./components/scroll-stack-sources.jsx";
import scrollStack from "./components/scroll-stack.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollStack} Demo={Demo} {...sources} />,
);
