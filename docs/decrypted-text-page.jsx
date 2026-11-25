import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/decrypted-text-demo.jsx";
import sources from "./components/decrypted-text-sources.jsx";
import decryptedText from "./components/decrypted-text.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...decryptedText} Demo={Demo} {...sources} />,
);
