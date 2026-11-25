import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/rating-breakdown-demo.jsx";
import sources from "./components/rating-breakdown-sources.jsx";
import ratingBreakdown from "./components/rating-breakdown.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ratingBreakdown} Demo={Demo} {...sources} />,
);
