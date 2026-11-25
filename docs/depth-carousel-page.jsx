import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/depth-carousel-demo.jsx";
import sources from "./components/depth-carousel-sources.jsx";
import depthCarousel from "./components/depth-carousel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...depthCarousel} Demo={Demo} {...sources} />,
);
