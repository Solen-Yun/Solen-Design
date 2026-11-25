import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/announcement-pill-demo.jsx";
import sources from "./components/announcement-pill-sources.jsx";
import announcementPill from "./components/announcement-pill.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...announcementPill} Demo={Demo} {...sources} />,
);
