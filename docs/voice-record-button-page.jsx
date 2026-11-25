import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/voice-record-button-demo.jsx";
import sources from "./components/voice-record-button-sources.jsx";
import voiceRecordButton from "./components/voice-record-button.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...voiceRecordButton} Demo={Demo} {...sources} />,
);
