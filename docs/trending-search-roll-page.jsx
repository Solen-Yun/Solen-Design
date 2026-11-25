import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/trending-search-roll-demo.jsx";
import sources from "./components/trending-search-roll-sources.jsx";
import trendingSearchRoll from "./components/trending-search-roll.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...trendingSearchRoll} Demo={Demo} {...sources} />,
);
