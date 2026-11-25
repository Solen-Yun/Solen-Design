import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/crystalized-ball-demo.jsx";
import sources from "./components/crystalized-ball-sources.jsx";
import crystalizedBall from "./components/crystalized-ball.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...crystalizedBall} Demo={Demo} {...sources} />,
);
