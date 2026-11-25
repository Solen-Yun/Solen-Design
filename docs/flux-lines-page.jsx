import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/flux-lines-demo.jsx";
import sources from "./components/flux-lines-sources.jsx";
import fluxLines from "./components/flux-lines.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fluxLines} Demo={Demo} {...sources} />,
);
