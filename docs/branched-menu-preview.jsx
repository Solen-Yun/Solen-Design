import { createRoot } from "react-dom/client";
import { BranchedMenu } from "../src/react/index.js";
import {
  CursorPointer01Icon,
  Download04Icon,
  Layers01Icon,
  Notification03Icon,
  PaintBoardIcon,
  Rocket01Icon,
  Settings02Icon,
  TextFontIcon
} from "@hugeicons/core-free-icons";

/* The standalone preview — the menu resting on a quiet dark canvas, with a
   second instance beside it showing a leaf-only section. */
const items = [
  {
    label: "开始使用",
    children: [
      { value: "install", label: "安装", icon: Download04Icon },
      { value: "quick", label: "快速上手", icon: Rocket01Icon },
      { value: "config", label: "配置", icon: Settings02Icon },
      { value: "theming", label: "主题定制", icon: PaintBoardIcon }
    ]
  },
  {
    label: "组件",
    children: [
      { value: "buttons", label: "按钮", icon: CursorPointer01Icon },
      { value: "typography", label: "文字排版", icon: TextFontIcon },
      { value: "overlays", label: "浮层", icon: Layers01Icon },
      { value: "toasts", label: "通知", icon: Notification03Icon }
    ]
  },
  { value: "about", label: "关于" }
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      background: "#17181c",
      minHeight: "100vh",
      colorScheme: "dark",
      display: "flex",
      gap: 64,
      alignItems: "center",
      justifyContent: "center",
      padding: 48,
    }}
  >
    <BranchedMenu items={items} defaultOpen={[0]} defaultActive="quick" />
    <BranchedMenu items={items} defaultOpen={-1} />
  </div>,
);
