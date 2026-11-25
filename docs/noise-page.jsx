import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/noise-demo.jsx";
import sources from "./components/noise-sources.jsx";
import noise from "./components/noise.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...noise} Demo={Demo} {...sources} />,
);
