import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/site-preloader-demo.jsx";
import sources from "./components/site-preloader-sources.jsx";
import sitePreloader from "./components/site-preloader.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...sitePreloader} Demo={Demo} {...sources} />,
);
