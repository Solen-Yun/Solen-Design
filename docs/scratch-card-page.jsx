import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/scratch-card-demo.jsx";
import sources from "./components/scratch-card-sources.jsx";
import scratchCard from "./components/scratch-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...scratchCard} Demo={Demo} {...sources} />,
);
