import { createRoot } from "react-dom/client";
import { SwarmCursor } from "../src/react/index.js";

/* 粒子蜂群光标：上方的白色蜂群绕光标打旋、悬停按钮时分流成环；
   下方琥珀色蜂群用长条粒子与涟漪点击，看速度拉伸与提亮。 */
createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: 40, background: "#101014" }}>
    <div style={{ flex: 1 }}>
      <SwarmCursor count={900} spread={100} color="#ffffff" accentColor="#7dd3fc">
        <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}>
          <div className="view-tabs"><button type="button">首页</button></div>
          <div className="view-tabs"><button type="button">组件</button></div>
          <div className="view-tabs"><button type="button">文档</button></div>
        </div>
      </SwarmCursor>
    </div>
    <div style={{ height: 220 }}>
      <SwarmCursor count={500} size={3} shape="streak" color="#ffd166" accentColor="#ff8a5f" spread={80} trail={1.4} clickEffect="pulse" idle="gather" intro={false} />
    </div>
  </div>,
);
