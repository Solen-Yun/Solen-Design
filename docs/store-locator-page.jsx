import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/store-locator-demo.jsx";
import sources from "./components/store-locator-sources.jsx";
import storeLocator from "./components/store-locator.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...storeLocator} Demo={Demo} {...sources} />,
);
