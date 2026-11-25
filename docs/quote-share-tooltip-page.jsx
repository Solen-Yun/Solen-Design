import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/quote-share-tooltip-demo.jsx";
import sources from "./components/quote-share-tooltip-sources.jsx";
import quoteShareTooltip from "./components/quote-share-tooltip.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...quoteShareTooltip} Demo={Demo} {...sources} />,
);
