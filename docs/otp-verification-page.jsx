import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/otp-verification-demo.jsx";
import sources from "./components/otp-verification-sources.jsx";
import otpVerification from "./components/otp-verification.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...otpVerification} Demo={Demo} {...sources} />,
);
