import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/trust-badges-demo.jsx";
import sources from "./components/trust-badges-sources.jsx";
import trustBadges from "./components/trust-badges.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...trustBadges} Demo={Demo} {...sources} />,
);
