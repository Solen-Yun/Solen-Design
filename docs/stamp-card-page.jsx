import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/stamp-card-demo.jsx";
import sources from "./components/stamp-card-sources.jsx";
import stampCard from "./components/stamp-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stampCard} Demo={Demo} {...sources} />,
);
