import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/lightfall-demo.jsx";
import sources from "./components/lightfall-sources.jsx";
import lightfall from "./components/lightfall.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...lightfall} Demo={Demo} {...sources} />,
);
