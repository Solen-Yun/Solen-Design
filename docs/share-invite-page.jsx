import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/share-invite-demo.jsx";
import sources from "./components/share-invite-sources.jsx";
import shareInvite from "./components/share-invite.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shareInvite} Demo={Demo} {...sources} />,
);
