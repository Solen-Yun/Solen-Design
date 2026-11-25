import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/magic-bento-demo.jsx";
import sources from "./components/magic-bento-sources.jsx";
import magicBento from "./components/magic-bento.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...magicBento} Demo={Demo} {...sources} />,
);
