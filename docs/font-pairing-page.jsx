import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/font-pairing-demo.jsx";
import sources from "./components/font-pairing-sources.jsx";
import fontPairing from "./components/font-pairing.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...fontPairing} Demo={Demo} {...sources} />,
);
