import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/sticky-phone-screens-demo.jsx";
import sources from "./components/sticky-phone-screens-sources.jsx";
import stickyPhoneScreens from "./components/sticky-phone-screens.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...stickyPhoneScreens} Demo={Demo} {...sources} />,
);
