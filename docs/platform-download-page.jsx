import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/platform-download-demo.jsx";
import sources from "./components/platform-download-sources.jsx";
import platformDownload from "./components/platform-download.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...platformDownload} Demo={Demo} {...sources} />,
);
