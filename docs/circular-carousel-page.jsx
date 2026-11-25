import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/circular-carousel-demo.jsx";
import sources from "./components/circular-carousel-sources.jsx";
import circularCarousel from "./components/circular-carousel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...circularCarousel} Demo={Demo} {...sources} />,
);
