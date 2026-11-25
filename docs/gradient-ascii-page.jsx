import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/gradient-ascii-demo.jsx";
import sources from "./components/gradient-ascii-sources.jsx";
import gradientAscii from "./components/gradient-ascii.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...gradientAscii} Demo={Demo} {...sources} />,
);
