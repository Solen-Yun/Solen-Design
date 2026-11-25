import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/magnet-demo.jsx";
import sources from "./components/magnet-sources.jsx";
import magnet from "./components/magnet.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...magnet} Demo={Demo} {...sources} />,
);
