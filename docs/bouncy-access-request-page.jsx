import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/bouncy-access-request-demo.jsx";
import sources from "./components/bouncy-access-request-sources.jsx";
import bouncyAccessRequest from "./components/bouncy-access-request.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...bouncyAccessRequest} Demo={Demo} {...sources} />,
);
