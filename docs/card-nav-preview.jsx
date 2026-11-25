import { createRoot } from "react-dom/client";
import { CardNav } from "../src/react/index.js";

/* 弹簧展开卡片导航：深浅两套主题各一条，默认展开看卡片错峰入场；点 Menu 看弹簧开合与汉堡变形。 */
const items = [
  {
    label: "关于",
    description: "团队、工作室与背后的故事。",
    links: [
      { label: "公司", href: "#" },
      { label: "招聘", href: "#" }
    ]
  },
  {
    label: "作品",
    description: "近几年挑出来的代表项目。",
    links: [
      { label: "精选", href: "#" },
      { label: "案例", href: "#" }
    ]
  },
  {
    label: "联系",
    description: "欢迎来信，每封都会读。",
    links: [
      { label: "邮件", href: "#" },
      { label: "动态", href: "#" },
      { label: "社区", href: "#" }
    ]
  }
];

const logo = (
  <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M6 14 L12 6 L18 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 48,
      background: "#101014",
    }}
  >
    <div style={{ width: "min(860px, 92vw)" }}>
      <CardNav logo={logo} logoAlt="首页" items={items} cta={{ label: "开始使用", href: "#" }} theme="dark" defaultOpen bounce={0.3} />
    </div>
    <div style={{ width: "min(680px, 92vw)" }}>
      <CardNav logo={logo} logoAlt="首页" items={items} theme="light" cardEffect="unfold" defaultOpen stagger={0.16} />
    </div>
  </div>,
);
