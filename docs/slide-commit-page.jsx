import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/slide-commit-demo.jsx";
import sources from "./components/slide-commit-sources.jsx";
import slideCommit from "./components/slide-commit.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...slideCommit} Demo={Demo} {...sources} />,
);
