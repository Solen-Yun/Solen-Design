import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/keyhole-zoom-demo.jsx";
import sources from "./components/keyhole-zoom-sources.jsx";
import keyholeZoom from "./components/keyhole-zoom.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...keyholeZoom} Demo={Demo} {...sources} />,
);
