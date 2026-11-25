import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/drag-card-carousel-demo.jsx";
import sources from "./components/drag-card-carousel-sources.jsx";
import dragCardCarousel from "./components/drag-card-carousel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...dragCardCarousel} Demo={Demo} {...sources} />,
);
