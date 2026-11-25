import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/cancel-save-offer-demo.jsx";
import sources from "./components/cancel-save-offer-sources.jsx";
import cancelSaveOffer from "./components/cancel-save-offer.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...cancelSaveOffer} Demo={Demo} {...sources} />,
);
