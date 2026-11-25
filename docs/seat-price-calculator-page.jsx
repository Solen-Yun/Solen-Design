import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/seat-price-calculator-demo.jsx";
import sources from "./components/seat-price-calculator-sources.jsx";
import seatPriceCalculator from "./components/seat-price-calculator.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...seatPriceCalculator} Demo={Demo} {...sources} />,
);
