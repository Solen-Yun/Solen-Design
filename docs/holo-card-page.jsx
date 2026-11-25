import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/holo-card-demo.jsx";
import sources from "./components/holo-card-sources.jsx";
import holoCard from "./components/holo-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...holoCard} Demo={Demo} {...sources} />,
);
