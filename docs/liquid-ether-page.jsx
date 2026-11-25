import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/liquid-ether-demo.jsx";
import sources from "./components/liquid-ether-sources.jsx";
import liquidEther from "./components/liquid-ether.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...liquidEther} Demo={Demo} {...sources} />,
);
