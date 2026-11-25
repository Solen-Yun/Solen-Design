import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/promo-code-summary-demo.jsx";
import sources from "./components/promo-code-summary-sources.jsx";
import promoCodeSummary from "./components/promo-code-summary.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...promoCodeSummary} Demo={Demo} {...sources} />,
);
