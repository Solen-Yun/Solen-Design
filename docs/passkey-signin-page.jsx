import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/passkey-signin-demo.jsx";
import sources from "./components/passkey-signin-sources.jsx";
import passkeySignin from "./components/passkey-signin.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...passkeySignin} Demo={Demo} {...sources} />,
);
