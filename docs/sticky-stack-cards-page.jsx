import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sticky-stack-cards-demo.jsx";
import sources from "./components/sticky-stack-cards-sources.jsx";
import stickyStackCards from "./components/sticky-stack-cards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stickyStackCards} Demo={Demo} {...sources} />,
);
