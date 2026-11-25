import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/tear-ticket-demo.jsx";
import sources from "./components/tear-ticket-sources.jsx";
import tearTicket from "./components/tear-ticket.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...tearTicket} Demo={Demo} {...sources} />,
);
