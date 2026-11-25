import { createRoot } from "react-dom/client";
import { default as ScrollStack, ScrollStackItem } from "../src/components/scroll-stack/ScrollStack.jsx";

/* 独立预览 — 深色画布上一叠四张卡在整页滚动中逐张钉住、压暗收拢；
   滚到牌堆收完再继续，看停留与释放。 */
const CARDS = [
  { emoji: "🃏", title: "第一张", hue: "linear-gradient(135deg, #667eea33, #764ba266)" },
  { emoji: "🎴", title: "第二张", hue: "linear-gradient(135deg, #f093fb33, #f5576c4d)" },
  { emoji: "🀄", title: "第三张", hue: "linear-gradient(135deg, #4facfe33, #00f2fe4d)" },
  { emoji: "🪙", title: "第四张", hue: "linear-gradient(135deg, #43e97b33, #38f9d74d)" },
];

createRoot(document.getElementById("root")).render(
  <div style={{ minHeight: "100vh", background: "#101014", padding: "48px 0" }}>
    <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 16px" }}>
      <ScrollStack useWindowScroll itemDistance={120} itemStackDistance={28} blurAmount={1} tiltAmount={4} holdDistance={260}>
        {CARDS.map((card) => (
          <ScrollStackItem key={card.title} style={{ backgroundImage: card.hue, backgroundBlendMode: "overlay" }}>
            <div style={{ fontSize: 40 }}>{card.emoji}</div>
            <h3 style={{ margin: "12px 0 0", fontSize: 18, fontWeight: 600 }}>{card.title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: 13, opacity: 0.65 }}>继续滚动，下一张会盖上来</p>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </div>
  </div>,
);
