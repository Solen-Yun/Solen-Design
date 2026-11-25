import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/threads-demo.jsx";
import sources from "./components/threads-sources.jsx";
import threads from "./components/threads.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...threads} Demo={Demo} {...sources} />,
);
