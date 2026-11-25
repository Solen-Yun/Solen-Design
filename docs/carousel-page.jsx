import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/carousel-demo.jsx";
import sources from "./components/carousel-sources.jsx";
import carousel from "./components/carousel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...carousel} Demo={Demo} {...sources} />,
);
