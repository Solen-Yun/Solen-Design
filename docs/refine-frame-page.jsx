import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/refine-frame-demo.jsx";
import sources from "./components/refine-frame-sources.jsx";
import refineFrame from "./components/refine-frame.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...refineFrame} Demo={Demo} {...sources} />,
);
