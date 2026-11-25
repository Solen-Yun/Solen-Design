import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/flex-carousel-demo.jsx";
import sources from "./components/flex-carousel-sources.jsx";
import flexCarousel from "./components/flex-carousel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...flexCarousel} Demo={Demo} {...sources} />,
);
