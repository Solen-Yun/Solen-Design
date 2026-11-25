import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/detail-expand-demo.jsx";
import sources from "./components/detail-expand-sources.jsx";
import detailExpand from "./components/detail-expand.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...detailExpand} Demo={Demo} {...sources} />,
);
