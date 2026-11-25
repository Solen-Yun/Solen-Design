import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sticky-buy-sheet-demo.jsx";
import sources from "./components/sticky-buy-sheet-sources.jsx";
import stickyBuySheet from "./components/sticky-buy-sheet.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stickyBuySheet} Demo={Demo} {...sources} />,
);
