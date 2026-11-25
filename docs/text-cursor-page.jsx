import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/text-cursor-demo.jsx";
import sources from "./components/text-cursor-sources.jsx";
import textCursor from "./components/text-cursor.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...textCursor} Demo={Demo} {...sources} />,
);
