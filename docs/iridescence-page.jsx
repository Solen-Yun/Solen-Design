import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/iridescence-demo.jsx";
import sources from "./components/iridescence-sources.jsx";
import iridescence from "./components/iridescence.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...iridescence} Demo={Demo} {...sources} />,
);
