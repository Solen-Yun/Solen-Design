import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/delivery-cutoff-demo.jsx";
import sources from "./components/delivery-cutoff-sources.jsx";
import deliveryCutoff from "./components/delivery-cutoff.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...deliveryCutoff} Demo={Demo} {...sources} />,
);
