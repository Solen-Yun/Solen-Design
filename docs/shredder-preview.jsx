import { createRoot } from "react-dom/client";
import { Shredder } from "../src/react/index.js";

/* The standalone preview — two machines on the dark canvas: a five-row
   document stack feeding itself on loop, and a coarse-strip model with
   wide torn paper. */

const docs = [
  { id: "contract", emoji: "📄", title: "合同草案", bg: "#27272a" },
  { id: "invoice", emoji: "🧾", title: "报销单据", bg: "#303034" },
  { id: "report", emoji: "📊", title: "季度报表", bg: "#27272a" },
  { id: "letter", emoji: "💌", title: "情书草稿", bg: "#303034" },
  { id: "minutes", emoji: "🗒️", title: "会议纪要", bg: "#27272a" },
];

const row = (item) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      height: 52,
      padding: "0 12px",
      borderRadius: 12,
      background: item.bg,
      color: "#f5f5f5",
    }}
  >
    <span style={{ fontSize: 18 }} aria-hidden="true">{item.emoji}</span>
    <span style={{ fontSize: 13, fontWeight: 500 }}>{item.title}</span>
  </div>
);

const coarse = [
  { id: "note-1", emoji: "🗒️", title: "便签 · 立刻撕掉", bg: "#3b3021" },
  { id: "note-2", emoji: "🎫", title: "过期的票根", bg: "#21303b" },
  { id: "note-3", emoji: "🗂️", title: "旧档案", bg: "#27272a" },
];

createRoot(document.getElementById("root")).render(
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      gap: 40,
      background: "#101014",
      padding: 24,
    }}
  >
    <Shredder
      items={docs}
      width={320}
      height={440}
      color="#f5f5f5"
      slitColor="#52525b"
      loopAfterDelete={true}
      autoAnimate={true}
      renderItem={row}
    />
    <Shredder
      items={coarse}
      width={320}
      height={440}
      color="#f5f5f5"
      slitColor="#b45309"
      stripWidth={26}
      curl={1.8}
      fallHeight={180}
      feedSpeed={220}
      loopAfterDelete={true}
      autoAnimate={true}
      renderItem={row}
    />
  </div>,
);
