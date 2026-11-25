import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/count-up-demo.jsx";
import sources from "./components/count-up-sources.jsx";
import countUp from "./components/count-up.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...countUp} Demo={Demo} {...sources} />,
);
