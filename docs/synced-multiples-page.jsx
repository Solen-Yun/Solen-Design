import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/synced-multiples-demo.jsx";
import sources from "./components/synced-multiples-sources.jsx";
import syncedMultiples from "./components/synced-multiples.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...syncedMultiples} Demo={Demo} {...sources} />,
);
