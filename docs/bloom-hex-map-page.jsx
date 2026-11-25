import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bloom-hex-map-demo.jsx";
import sources from "./components/bloom-hex-map-sources.jsx";
import bloomHexMap from "./components/bloom-hex-map.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...bloomHexMap} Demo={Demo} {...sources} />,
);
