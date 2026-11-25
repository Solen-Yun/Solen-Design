import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ribbons-demo.jsx";
import sources from "./components/ribbons-sources.jsx";
import ribbons from "./components/ribbons.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ribbons} Demo={Demo} {...sources} />,
);
