import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/magic-rings-demo.jsx";
import sources from "./components/magic-rings-sources.jsx";
import magicRings from "./components/magic-rings.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...magicRings} Demo={Demo} {...sources} />,
);
