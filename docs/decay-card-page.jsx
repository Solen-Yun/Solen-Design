import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/decay-card-demo.jsx";
import sources from "./components/decay-card-sources.jsx";
import decayCard from "./components/decay-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...decayCard} Demo={Demo} {...sources} />,
);
