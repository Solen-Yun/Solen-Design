import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/spring-check-demo.jsx";
import sources from "./components/spring-check-sources.jsx";
import springCheck from "./components/spring-check.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...springCheck} Demo={Demo} {...sources} />,
);
