import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/transfer-glow-demo.jsx";
import sources from "./components/transfer-glow-sources.jsx";
import transferGlow from "./components/transfer-glow.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...transferGlow} Demo={Demo} {...sources} />,
);
