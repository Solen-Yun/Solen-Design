import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/light-tunnel-demo.jsx";
import sources from "./components/light-tunnel-sources.jsx";
import lightTunnel from "./components/light-tunnel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lightTunnel} Demo={Demo} {...sources} />,
);
