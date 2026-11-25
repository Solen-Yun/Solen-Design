import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/liquid-chrome-demo.jsx";
import sources from "./components/liquid-chrome-sources.jsx";
import liquidChrome from "./components/liquid-chrome.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...liquidChrome} Demo={Demo} {...sources} />,
);
