import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/category-chip-scrollspy-demo.jsx";
import sources from "./components/category-chip-scrollspy-sources.jsx";
import categoryChipScrollspy from "./components/category-chip-scrollspy.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...categoryChipScrollspy} Demo={Demo} {...sources} />,
);
