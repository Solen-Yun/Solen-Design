import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/padlock-toggle-demo.jsx";
import sources from "./components/padlock-toggle-sources.jsx";
import padlockToggle from "./components/padlock-toggle.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...padlockToggle} Demo={Demo} {...sources} />,
);
