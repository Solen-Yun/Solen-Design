import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/molten-metal-demo.jsx";
import sources from "./components/molten-metal-sources.jsx";
import moltenMetal from "./components/molten-metal.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...moltenMetal} Demo={Demo} {...sources} />,
);
