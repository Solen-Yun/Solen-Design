import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/cookie-consent-demo.jsx";
import sources from "./components/cookie-consent-sources.jsx";
import cookieConsent from "./components/cookie-consent.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cookieConsent} Demo={Demo} {...sources} />,
);
