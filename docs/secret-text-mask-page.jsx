import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/secret-text-mask-demo.jsx";
import sources from "./components/secret-text-mask-sources.jsx";
import secretTextMask from "./components/secret-text-mask.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...secretTextMask} Demo={Demo} {...sources} />,
);
