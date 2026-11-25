import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/link-shortener-demo.jsx";
import sources from "./components/link-shortener-sources.jsx";
import linkShortener from "./components/link-shortener.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...linkShortener} Demo={Demo} {...sources} />,
);
