import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/hold-button-demo.jsx";
import sources from "./components/hold-button-sources.jsx";
import holdButton from "./components/hold-button.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...holdButton} Demo={Demo} {...sources} />,
);
