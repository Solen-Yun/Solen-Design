import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/team-invite-demo.jsx";
import sources from "./components/team-invite-sources.jsx";
import teamInvite from "./components/team-invite.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...teamInvite} Demo={Demo} {...sources} />,
);
