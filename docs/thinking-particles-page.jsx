import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/thinking-particles-demo.jsx";
import sources from "./components/thinking-particles-sources.jsx";
import thinkingParticles from "./components/thinking-particles.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...thinkingParticles} Demo={Demo} {...sources} />,
);
