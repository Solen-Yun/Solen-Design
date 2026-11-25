import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hyperspeed-demo.jsx";
import sources from "./components/hyperspeed-sources.jsx";
import hyperspeed from "./components/hyperspeed.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...hyperspeed} Demo={Demo} {...sources} />,
);
