import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glow-border-cta-demo.jsx";
import sources from "./components/glow-border-cta-sources.jsx";
import glowBorderCta from "./components/glow-border-cta.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glowBorderCta} Demo={Demo} {...sources} />,
);
