import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/notification-priming-demo.jsx";
import sources from "./components/notification-priming-sources.jsx";
import notificationPriming from "./components/notification-priming.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...notificationPriming} Demo={Demo} {...sources} />,
);
