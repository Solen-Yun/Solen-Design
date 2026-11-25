import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/slot-booking-demo.jsx";
import sources from "./components/slot-booking-sources.jsx";
import slotBooking from "./components/slot-booking.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...slotBooking} Demo={Demo} {...sources} />,
);
