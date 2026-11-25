import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/phone-country-input-demo.jsx";
import sources from "./components/phone-country-input-sources.jsx";
import phoneCountryInput from "./components/phone-country-input.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...phoneCountryInput} Demo={Demo} {...sources} />,
);
