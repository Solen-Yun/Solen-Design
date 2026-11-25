import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/peek-rating-demo.jsx";
import sources from "./components/peek-rating-sources.jsx";
import peekRating from "./components/peek-rating.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...peekRating} Demo={Demo} {...sources} />,
);
