import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/particles-demo.jsx";
import sources from "./components/particles-sources.jsx";
import particles from "./components/particles.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...particles} Demo={Demo} {...sources} />,
);
