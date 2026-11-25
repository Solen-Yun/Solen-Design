import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/tilted-card-demo.jsx";
import sources from "./components/tilted-card-sources.jsx";
import tiltedCard from "./components/tilted-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...tiltedCard} Demo={Demo} {...sources} />,
);
