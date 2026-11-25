import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/domain-connect-demo.jsx";
import sources from "./components/domain-connect-sources.jsx";
import domainConnect from "./components/domain-connect.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...domainConnect} Demo={Demo} {...sources} />,
);
