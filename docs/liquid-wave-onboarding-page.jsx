import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/liquid-wave-onboarding-demo.jsx";
import sources from "./components/liquid-wave-onboarding-sources.jsx";
import liquidWaveOnboarding from "./components/liquid-wave-onboarding.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...liquidWaveOnboarding} Demo={Demo} {...sources} />,
);
