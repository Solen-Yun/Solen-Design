import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pixel-card-demo.jsx";
import sources from "./components/pixel-card-sources.jsx";
import pixelCard from "./components/pixel-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pixelCard} Demo={Demo} {...sources} />,
);
