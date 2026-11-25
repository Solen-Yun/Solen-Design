import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/spring-tuner-demo.jsx";
import sources from "./components/spring-tuner-sources.jsx";
import springTuner from "./components/spring-tuner.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...springTuner} Demo={Demo} {...sources} />,
);
