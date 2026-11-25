import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/coupon-tear-demo.jsx";
import sources from "./components/coupon-tear-sources.jsx";
import couponTear from "./components/coupon-tear.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...couponTear} Demo={Demo} {...sources} />,
);
