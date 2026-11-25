import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/conditional-contact-demo.jsx";
import sources from "./components/conditional-contact-sources.jsx";
import conditionalContact from "./components/conditional-contact.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...conditionalContact} Demo={Demo} {...sources} />,
);
