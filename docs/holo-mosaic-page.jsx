import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/holo-mosaic-demo.jsx";
import sources from "./components/holo-mosaic-sources.jsx";
import holoMosaic from "./components/holo-mosaic.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...holoMosaic} Demo={Demo} {...sources} />,
);
