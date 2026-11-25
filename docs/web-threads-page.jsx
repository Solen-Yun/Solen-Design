import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/web-threads-demo.jsx";
import sources from "./components/web-threads-sources.jsx";
import webThreads from "./components/web-threads.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...webThreads} Demo={Demo} {...sources} />,
);
