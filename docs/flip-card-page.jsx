import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/flip-card-demo.jsx";
import sources from "./components/flip-card-sources.jsx";
import flipCard from "./components/flip-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...flipCard} Demo={Demo} {...sources} />,
);
