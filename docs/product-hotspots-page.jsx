import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/product-hotspots-demo.jsx";
import sources from "./components/product-hotspots-sources.jsx";
import productHotspots from "./components/product-hotspots.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...productHotspots} Demo={Demo} {...sources} />,
);
