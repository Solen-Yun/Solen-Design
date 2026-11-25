import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/text-type-demo.jsx";
import sources from "./components/text-type-sources.jsx";
import textType from "./components/text-type.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...textType} Demo={Demo} {...sources} />,
);
