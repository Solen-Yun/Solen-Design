import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/avatar-stack-join-demo.jsx";
import sources from "./components/avatar-stack-join-sources.jsx";
import avatarStackJoin from "./components/avatar-stack-join.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...avatarStackJoin} Demo={Demo} {...sources} />,
);
