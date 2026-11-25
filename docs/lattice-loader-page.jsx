import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/lattice-loader-demo.jsx";
import sources from "./components/lattice-loader-sources.jsx";
import latticeLoader from "./components/lattice-loader.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...latticeLoader} Demo={Demo} {...sources} />,
);
