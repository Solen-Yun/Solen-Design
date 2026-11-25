import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/card-stack-swap-demo.jsx";
import sources from "./components/card-stack-swap-sources.jsx";
import cardStackSwap from "./components/card-stack-swap.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cardStackSwap} Demo={Demo} {...sources} />,
);
