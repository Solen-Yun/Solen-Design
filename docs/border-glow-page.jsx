import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/border-glow-demo.jsx";
import sources from "./components/border-glow-sources.jsx";
import borderGlow from "./components/border-glow.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...borderGlow} Demo={Demo} {...sources} />,
);
