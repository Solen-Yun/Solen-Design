import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/aero-shards-demo.jsx";
import sources from "./components/aero-shards-sources.jsx";
import aeroShards from "./components/aero-shards.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...aeroShards} Demo={Demo} {...sources} />,
);
