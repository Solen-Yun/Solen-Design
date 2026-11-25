import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/glide-select-demo.jsx";
import sources from "./components/glide-select-sources.jsx";
import glideSelect from "./components/glide-select.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...glideSelect} Demo={Demo} {...sources} />,
);
