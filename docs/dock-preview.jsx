import { createRoot } from "react-dom/client";
import { Dock } from "../src/react/index.js";

/* 弹性放大程序坞：下边和左边各一条深色坞，扫过看放大波，点击看弹跳，右键设置图标玩多级菜单。 */
const items = [
  { icon: "🌐", label: "浏览器", onClick: () => console.log("浏览器") },
  { icon: "✉️", label: "邮件", badge: 3, onClick: () => console.log("邮件") },
  { icon: "🎵", label: "音乐", onClick: () => console.log("音乐") },
  { icon: "📷", label: "照片", active: true, onClick: () => console.log("照片") },
  { separator: true },
  {
    icon: "⚙️",
    label: "设置",
    menu: [
      { label: "通用", shortcut: "⌘," },
      { label: "外观", items: [{ label: "浅色" }, { label: "深色" }, { label: "自动" }] },
      { separator: true },
      { label: "Wi-Fi", checked: true },
      { label: "蓝牙", checked: false },
      { separator: true },
      { label: "锁定屏幕", shortcut: "⌃⌘Q" }
    ]
  },
  { icon: "🗑️", label: "废纸篓", badge: true, onClick: () => console.log("废纸篓") }
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      position: "relative",
      minHeight: "100vh",
      background: "radial-gradient(circle at 50% 30%, #3a3644 0%, #101014 75%)",
      overflow: "hidden",
    }}
  >
    <Dock items={items} theme="dark" position="bottom" />
    <Dock items={items} theme="dark" position="left" magnification={62} distance={140} />
  </div>,
);
