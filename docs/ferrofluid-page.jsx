import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/ferrofluid-demo.jsx";
import sources from "./components/ferrofluid-sources.jsx";
import ferrofluid from "./components/ferrofluid.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...ferrofluid} Demo={Demo} {...sources} />,
);
