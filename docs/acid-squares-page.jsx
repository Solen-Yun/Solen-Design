import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/acid-squares-demo.jsx";
import sources from "./components/acid-squares-sources.jsx";
import acidSquares from "./components/acid-squares.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...acidSquares} Demo={Demo} {...sources} />,
);
