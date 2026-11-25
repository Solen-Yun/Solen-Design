import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/click-spark-demo.jsx";
import sources from "./components/click-spark-sources.jsx";
import clickSpark from "./components/click-spark.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...clickSpark} Demo={Demo} {...sources} />,
);
