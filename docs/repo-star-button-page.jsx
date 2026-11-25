import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/repo-star-button-demo.jsx";
import sources from "./components/repo-star-button-sources.jsx";
import repoStarButton from "./components/repo-star-button.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...repoStarButton} Demo={Demo} {...sources} />,
);
