import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/galaxy-demo.jsx";
import sources from "./components/galaxy-sources.jsx";
import galaxy from "./components/galaxy.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...galaxy} Demo={Demo} {...sources} />,
);
