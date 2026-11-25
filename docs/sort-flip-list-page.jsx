import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sort-flip-list-demo.jsx";
import sources from "./components/sort-flip-list-sources.jsx";
import sortFlipList from "./components/sort-flip-list.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sortFlipList} Demo={Demo} {...sources} />,
);
