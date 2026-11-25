import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/shimmer-gradient-text-demo.jsx";
import sources from "./components/shimmer-gradient-text-sources.jsx";
import shimmerGradientText from "./components/shimmer-gradient-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shimmerGradientText} Demo={Demo} {...sources} />,
);
