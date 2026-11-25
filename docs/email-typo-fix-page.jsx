import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/email-typo-fix-demo.jsx";
import sources from "./components/email-typo-fix-sources.jsx";
import emailTypoFix from "./components/email-typo-fix.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...emailTypoFix} Demo={Demo} {...sources} />,
);
