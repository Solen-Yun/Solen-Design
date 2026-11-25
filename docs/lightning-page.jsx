import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/lightning-demo.jsx";
import sources from "./components/lightning-sources.jsx";
import lightning from "./components/lightning.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lightning} Demo={Demo} {...sources} />,
);
