import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/mention-comment-demo.jsx";
import sources from "./components/mention-comment-sources.jsx";
import mentionComment from "./components/mention-comment.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...mentionComment} Demo={Demo} {...sources} />,
);
