import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bounce-cards-demo.jsx";
import sources from "./components/bounce-cards-sources.jsx";
import bounceCards from "./components/bounce-cards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...bounceCards} Demo={Demo} {...sources} />,
);
