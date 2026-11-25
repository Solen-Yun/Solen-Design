import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/particle-network-demo.jsx";
import sources from "./components/particle-network-sources.jsx";
import particleNetwork from "./components/particle-network.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...particleNetwork} Demo={Demo} {...sources} />,
);
