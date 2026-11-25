import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/text-scramble-decode-demo.jsx";
import sources from "./components/text-scramble-decode-sources.jsx";
import textScrambleDecode from "./components/text-scramble-decode.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...textScrambleDecode} Demo={Demo} {...sources} />,
);
