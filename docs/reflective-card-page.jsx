import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/reflective-card-demo.jsx";
import sources from "./components/reflective-card-sources.jsx";
import reflectiveCard from "./components/reflective-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...reflectiveCard} Demo={Demo} {...sources} />,
);
