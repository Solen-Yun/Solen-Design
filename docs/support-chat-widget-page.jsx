import { createRoot } from "react-dom/client";
import { ComponentPage } from "./component-page.jsx";
import { Demo } from "./components/support-chat-widget-demo.jsx";
import sources from "./components/support-chat-widget-sources.jsx";
import supportChatWidget from "./components/support-chat-widget.jsx";

createRoot(document.getElementById("root")).render(
  <ComponentPage {...supportChatWidget} Demo={Demo} {...sources} />,
);
