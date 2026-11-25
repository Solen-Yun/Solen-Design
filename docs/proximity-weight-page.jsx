import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/proximity-weight-demo.jsx";
import sources from "./components/proximity-weight-sources.jsx";
import proximityWeight from "./components/proximity-weight.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...proximityWeight} Demo={Demo} {...sources} />,
);
