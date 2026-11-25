import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/velocity-skew-list-demo.jsx";
import sources from "./components/velocity-skew-list-sources.jsx";
import velocitySkewList from "./components/velocity-skew-list.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...velocitySkewList} Demo={Demo} {...sources} />,
);
