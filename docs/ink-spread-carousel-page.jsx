import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ink-spread-carousel-demo.jsx";
import sources from "./components/ink-spread-carousel-sources.jsx";
import inkSpreadCarousel from "./components/ink-spread-carousel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...inkSpreadCarousel} Demo={Demo} {...sources} />,
);
