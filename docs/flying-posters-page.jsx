import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/flying-posters-demo.jsx";
import sources from "./components/flying-posters-sources.jsx";
import flyingPosters from "./components/flying-posters.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...flyingPosters} Demo={Demo} {...sources} />,
);
