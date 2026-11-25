import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/antigravity-demo.jsx";
import sources from "./components/antigravity-sources.jsx";
import antigravity from "./components/antigravity.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...antigravity} Demo={Demo} {...sources} />,
);
