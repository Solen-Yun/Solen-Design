import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shuffle-demo.jsx";
import sources from "./components/shuffle-sources.jsx";
import shuffle from "./components/shuffle.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shuffle} Demo={Demo} {...sources} />,
);
