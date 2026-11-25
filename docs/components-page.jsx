import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { COMPONENTS, CATEGORIES } from "./registry.jsx";

/* 画廊挂静态封面图，不挂演示。每张卡挂一个组件演示，等于同时跑起
   上百个 rAF / WebGL 循环，而且演示一旦挂上就不卸载——网格越滚越卡。
   封面由 scripts/shoot-covers.mjs 生成；演示留在组件详情页，那里一次
   只跑一个。 */

function Card({ component }) {
  return (
    <a className="comp-card" href={component.href}>
      <span className="comp-preview">
        <img
          src={`./assets/cover/${component.id}.jpg`}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
      <div className="comp-body">
        <div className="comp-name">{component.name}</div>
        {component.cardDescription ? (
          <div className="comp-desc">{component.cardDescription}</div>
        ) : null}
      </div>
    </a>
  );
}

function App() {
  /* The sidebar finder (chrome.js) is the source of truth; it broadcasts
     its category here so the grid follows the same filter. The initial
     state comes from sessionStorage so a restored filter is in effect
     before chrome.js fires any event. */
  const [categoryId, setCategoryId] = useState(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("solen:sidebar-filter"));
      const valid = saved && (saved.categoryId === "all" || CATEGORIES.some((c) => c.id === saved.categoryId));
      if (valid) return saved.categoryId;
    } catch {}
    return "all";
  });
  useEffect(() => {
    const onFilter = (event) => setCategoryId(event.detail.categoryId);
    window.addEventListener("solen:filter", onFilter);
    return () => window.removeEventListener("solen:filter", onFilter);
  }, []);

  const list = categoryId === "all"
    ? COMPONENTS
    : COMPONENTS.filter((c) =>
        CATEGORIES.find((category) => category.id === categoryId)?.items.includes(c.id),
      );

  return (
    <>
      <section className="page-head">
        <h1>组件</h1>
        <p>将这些创意组件直接用在你的项目中。浏览组件库，按自己的需要调整，更多效果正在加入。</p>
      </section>

      <section>
        <div className="comp-grid">
          {list.map((component) => (
            <Card key={component.id} component={component} />
          ))}
        </div>
      </section>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
