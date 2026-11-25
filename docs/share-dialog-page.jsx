import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/share-dialog-demo.jsx";
import sources from "./components/share-dialog-sources.jsx";
import shareDialog from "./components/share-dialog.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...shareDialog} Demo={Demo} {...sources} />,
);
