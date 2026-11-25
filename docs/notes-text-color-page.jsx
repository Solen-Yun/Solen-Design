import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/notes-text-color-demo.jsx";
import sources from "./components/notes-text-color-sources.jsx";
import notesTextColor from "./components/notes-text-color.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...notesTextColor} Demo={Demo} {...sources} />,
);
