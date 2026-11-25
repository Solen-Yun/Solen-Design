import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/color-bends-demo.jsx";
import sources from "./components/color-bends-sources.jsx";
import colorBends from "./components/color-bends.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...colorBends} Demo={Demo} {...sources} />,
);
