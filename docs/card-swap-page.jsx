import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/card-swap-demo.jsx";
import sources from "./components/card-swap-sources.jsx";
import cardSwap from "./components/card-swap.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cardSwap} Demo={Demo} {...sources} />,
);
