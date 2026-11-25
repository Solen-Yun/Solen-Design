import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/type-to-delete-demo.jsx";
import sources from "./components/type-to-delete-sources.jsx";
import typeToDelete from "./components/type-to-delete.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...typeToDelete} Demo={Demo} {...sources} />,
);
