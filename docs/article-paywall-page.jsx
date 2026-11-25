import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/article-paywall-demo.jsx";
import sources from "./components/article-paywall-sources.jsx";
import articlePaywall from "./components/article-paywall.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...articlePaywall} Demo={Demo} {...sources} />,
);
