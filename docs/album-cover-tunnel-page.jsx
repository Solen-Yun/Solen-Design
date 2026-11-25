import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/album-cover-tunnel-demo.jsx";
import sources from "./components/album-cover-tunnel-sources.jsx";
import albumCoverTunnel from "./components/album-cover-tunnel.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...albumCoverTunnel} Demo={Demo} {...sources} />,
);
