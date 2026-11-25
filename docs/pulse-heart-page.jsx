import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/pulse-heart-demo.jsx";
import sources from "./components/pulse-heart-sources.jsx";
import pulseHeart from "./components/pulse-heart.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...pulseHeart} Demo={Demo} {...sources} />,
);
