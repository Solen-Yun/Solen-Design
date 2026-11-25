import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/swipe-row-demo.jsx";
import sources from "./components/swipe-row-sources.jsx";
import swipeRow from "./components/swipe-row.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...swipeRow} Demo={Demo} {...sources} />,
);
