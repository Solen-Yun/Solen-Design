import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/echo-text-demo.jsx";
import sources from "./components/echo-text-sources.jsx";
import echoText from "./components/echo-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...echoText} Demo={Demo} {...sources} />,
);
