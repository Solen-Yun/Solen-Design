import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/voice-pill-demo.jsx";
import sources from "./components/voice-pill-sources.jsx";
import voicePill from "./components/voice-pill.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...voicePill} Demo={Demo} {...sources} />,
);
