import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/animated-list-demo.jsx";
import sources from "./components/animated-list-sources.jsx";
import animatedList from "./components/animated-list.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...animatedList} Demo={Demo} {...sources} />,
);
