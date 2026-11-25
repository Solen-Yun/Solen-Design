import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scroll-float-demo.jsx";
import sources from "./components/scroll-float-sources.jsx";
import scrollFloat from "./components/scroll-float.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scrollFloat} Demo={Demo} {...sources} />,
);
