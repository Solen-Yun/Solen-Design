import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/metallic-paint-demo.jsx";
import sources from "./components/metallic-paint-sources.jsx";
import metallicPaint from "./components/metallic-paint.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...metallicPaint} Demo={Demo} {...sources} />,
);
