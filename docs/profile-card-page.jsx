import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/profile-card-demo.jsx";
import sources from "./components/profile-card-sources.jsx";
import profileCard from "./components/profile-card.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...profileCard} Demo={Demo} {...sources} />,
);
