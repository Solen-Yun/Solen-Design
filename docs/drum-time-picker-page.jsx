import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/drum-time-picker-demo.jsx";
import sources from "./components/drum-time-picker-sources.jsx";
import drumTimePicker from "./components/drum-time-picker.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...drumTimePicker} Demo={Demo} {...sources} />,
);
