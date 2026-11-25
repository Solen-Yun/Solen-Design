import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gradient-blinds-demo.jsx";
import sources from "./components/gradient-blinds-sources.jsx";
import gradientBlinds from "./components/gradient-blinds.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gradientBlinds} Demo={Demo} {...sources} />,
);
