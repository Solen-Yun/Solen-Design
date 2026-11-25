/* Docs workbench chrome — builds the sidebar (brand + grouped nav) from one
   nav source of truth. Dev-only, not part of the library. */

/* Slider fill — keep every range input's --pct in sync with its value so the
   CSS fill bar tracks the thumb. React re-renders included, so a cheap rAF
   poll with a change check beats chasing every framework event. Color
   pickers get the same treatment: a live hex chip beside the swatch. */
(() => {
  const syncRange = (el) => {
    const min = Number(el.min) || 0;
    const max = Number(el.max) || 100;
    const pct = ((Number(el.value) - min) / ((max - min) || 1)) * 100;
    if (el._pct !== pct) {
      el._pct = pct;
      el.style.setProperty("--pct", `${pct}%`);
    }
  };
  const syncColor = (el) => {
    let chip = el.nextElementSibling;
    if (!chip || !chip.classList.contains("control-hex")) {
      chip = document.createElement("span");
      chip.className = "control-hex";
      chip.setAttribute("aria-hidden", "true");
      el.after(chip);
    }
    const hex = el.value.toUpperCase();
    if (chip.textContent !== hex) chip.textContent = hex;
  };
  const loop = () => {
    for (const el of document.querySelectorAll('input[type="range"]')) syncRange(el);
    for (const el of document.querySelectorAll('input[type="color"]')) syncColor(el);
    requestAnimationFrame(loop);
  };
  /* The poll only pays for itself on pages that actually have the inputs.
     This module runs before the page's React bootstrap, so watch for the
     inputs showing up later and start the loop on first sight — pages
     without sliders never spin a frame. */
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    requestAnimationFrame(loop);
  };
  if (document.querySelector('input[type="range"],input[type="color"]')) {
    start();
  } else {
    const watch = new MutationObserver(() => {
      if (document.querySelector('input[type="range"],input[type="color"]')) {
        watch.disconnect();
        start();
      }
    });
    watch.observe(document.documentElement, { childList: true, subtree: true });
  }
})();

/* 站点级导航（顶部悬浮导航条）。 */
const SECTIONS = [
  { label: "首页", href: "index.html" },
  { label: "网站风格", href: "style.html" },
  { label: "UI 组件", href: "components.html" },
  { label: "文档", href: "docs.html" },
];

const here = currentFile();
/* Component pages are the registry-backed ones: the gallery plus every
   <component-id>.html detail page. The shell pages and the style gallery
   (style-*.html) are not. Filename-based so the check works identically in
   dev and in the built site, where script srcs are hashed bundles instead
   of *-page.jsx paths. */
const inComponents =
  !["index.html", "style.html", "docs.html", "base.html"].includes(here) &&
  !here.startsWith("style-");
const { COMPONENTS, CATEGORIES } = inComponents ? await import("./registry.jsx") : {};

function currentFile() {
  const name = location.pathname.split("/").pop();
  return name === "" ? "index.html" : name;
}

/* ---------- Right rail — promo and sponsors, placeholders for now.
   Only component detail pages get it: the gallery needs the width,
   and the other pages stay lean. ---------- */

const layout = document.querySelector(".layout");
if (
  layout &&
  inComponents &&
  here !== "components.html" &&
  !layout.querySelector(".rail")
) {
  layout.insertAdjacentHTML(
    "beforeend",
    `<aside class="rail">
      <div class="rail-card">
        <div class="rail-banner">Solen Design</div>
      </div>
      <div class="rail-card">
        <div class="rail-body">
          <p class="rail-title">公告</p>
          <p class="rail-text">组件库持续更新中，新组件会第一时间在这里发布。</p>
        </div>
      </div>
      <div class="rail-card">
        <div class="rail-body">
          <div class="rail-head">
            <span class="rail-title">联系我们</span>
            <span class="rail-note">扫码联系</span>
          </div>
          <div class="rail-contact">
            <div class="rail-contact-item">
              <button type="button" class="rail-contact-btn" data-qr="wechat">
                <span class="rail-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4C5.36 4 2 6.69 2 10c0 1.89 1.08 3.56 2.78 4.66l-.7 2.1 2.44-1.23c.93.3 1.94.47 3 .47.22 0 .44-.01.66-.02-.14-.44-.22-.9-.22-1.38 0-2.9 2.86-5.25 6.39-5.25.23 0 .46.01.68.03C16.35 6.24 13.24 4 9.5 4Zm-2.6 3.1a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Zm5.2 0a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8Z"/><path d="M15.6 10.7c-3.03 0-5.5 2.01-5.5 4.5s2.47 4.5 5.5 4.5c.77 0 1.5-.12 2.17-.35l2.05 1.05-.62-1.82c1.42-.86 2.3-2.15 2.3-3.38 0-2.49-2.47-4.5-5.5-4.5Zm-1.9 2.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Zm3.8 0a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6Z"/></svg>
                </span>
                <span class="rail-contact-label">微信</span>
              </button>
              <p class="rail-contact-text">进群 / 学习 / 反馈 / 了解一手动态<br />可以添加我微信<br />Solen 支持接 UI 设计、Agent 定制、产品开发等</p>
            </div>
            <div class="rail-contact-item">
              <button type="button" class="rail-contact-btn" data-qr="channels">
                <span class="rail-contact-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="currentColor"/><path fill="var(--sd-surface)" stroke="var(--sd-surface)" stroke-width="1.4" stroke-linejoin="round" d="M6 8.4 11.2 12 6 15.6zM18 8.4 12.8 12 18 15.6z"/></svg>
                </span>
                <span class="rail-contact-label">视频号</span>
              </button>
              <p class="rail-contact-text">新开了一个视频号，家人们可以关注一下<br />每满一万粉抽 Codex 或者 Claude 订阅</p>
            </div>
            <div class="rail-contact-item">
              <a class="rail-contact-btn" href="https://rhyme3.com" target="_blank" rel="noopener">
                <span class="rail-contact-icon mark-swap" aria-hidden="true">
                  <img class="mark-light" src="assets/mark-01-v2-accent.svg" alt="" />
                  <img class="mark-dark" src="assets/mark-01-v2-reverse.svg" alt="" />
                </span>
                <span class="rail-contact-label">Solenio AI大模型聚合平台</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </aside>`,
  );

  /* QR modal — one shared dialog for both contact codes. */
  const QR_DATA = {
    wechat: {
      title: "微信",
      images: [
        { label: "微信", src: "assets/qr-wechat.jpg" },
        { label: "备用微信", src: "assets/qr-wechat-backup.jpg" },
      ],
    },
    channels: {
      title: "视频号",
      images: [{ label: "视频号", src: "assets/qr-channels.jpg" }],
    },
  };
  const modal = document.createElement("div");
  modal.className = "qr-modal";
  modal.hidden = true;
  modal.innerHTML = `
    <div class="qr-modal-backdrop"></div>
    <div class="qr-modal-panel" role="dialog" aria-modal="true">
      <button type="button" class="qr-modal-close" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>
      </button>
      <h2 class="qr-modal-title"></h2>
      <div class="qr-modal-images"></div>
    </div>`;
  document.body.appendChild(modal);
  const panel = modal.querySelector(".qr-modal-panel");
  const closeBtn = modal.querySelector(".qr-modal-close");
  let lastFocus = null;
  function closeQr() {
    modal.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  function openQr(key) {
    const data = QR_DATA[key];
    if (!data) return;
    lastFocus = document.activeElement;
    /* 两张并排时把弹窗加宽，单张保持原尺寸。 */
    modal.classList.toggle("is-wide", data.images.length > 1);
    modal.querySelector(".qr-modal-title").textContent = data.title;
    modal.querySelector(".qr-modal-images").innerHTML = data.images
      .map(
        (item) =>
          `<figure class="qr-modal-figure"><img class="qr-modal-image" src="${item.src}" alt="${item.label}二维码" /><figcaption class="qr-modal-figure-label">${item.label}</figcaption></figure>`,
      )
      .join("");
    modal.hidden = false;
    closeBtn.focus();
  }
  modal.querySelector(".qr-modal-backdrop").addEventListener("click", closeQr);
  closeBtn.addEventListener("click", closeQr);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) closeQr();
  });
  document.querySelectorAll(".rail-contact-btn[data-qr]").forEach((button) => {
    button.addEventListener("click", () => openQr(button.dataset.qr));
  });
}

/* --- Top navigation bar — floating glass navbar across the layout top. --- */

if (layout) {
  const iconbar = document.createElement("nav");
  iconbar.className = "iconbar";
  iconbar.setAttribute("aria-label", "站点导航");

  const iconBrand = document.createElement("a");
  iconBrand.className = "iconbar-brand";
  iconBrand.href = "index.html";
  iconBrand.title = "Solen Design";
  iconBrand.innerHTML = `
    <span class="mark mark-swap">
      <img class="mark-light" src="assets/mark-01-v2-accent.svg" alt="" />
      <img class="mark-dark" src="assets/mark-01-v2-reverse.svg" alt="" />
    </span>
    <span class="iconbar-brand-name">Solen Design</span>`;
  iconbar.append(iconBrand);

  /* 撑开中间空隙，把导航链接推到右侧。 */
  const spacer = document.createElement("div");
  spacer.className = "iconbar-spacer";
  iconbar.append(spacer);

  /* 四个板块项一组 iOS 式分段控件：选中段由 active + aria-current 标记。
     这里刻意不用果冻导航（GooeyNav）：它的 WebGL 画布放进这条固定定位
     的玻璃条后，条一收缩画布就挪位，Chromium 的合成器会把画布层损坏成
     一块不透明白矩形、还会把条自己的背景透掉——预览卡片直接压到导航
     条上。组件库里的 GooeyNav 不受影响（非 fixed 场景正常），只是站点
     骨架这里改回纯 DOM 链接。 */
  const seg = document.createElement("div");
  seg.className = "iconbar-seg";
  seg.setAttribute("role", "group");
  seg.setAttribute("aria-label", "站点板块");

  for (const section of SECTIONS) {
    const a = document.createElement("a");
    a.className = "iconbar-item";
    a.textContent = section.label;
    a.href = section.href;
    if (
      section.href === here ||
      (section.href === "components.html" && inComponents) ||
      (section.href === "style.html" && here.startsWith("style-"))
    ) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
    seg.append(a);
  }
  iconbar.append(seg);

  /* 挂到 body 末尾而不是 .layout 开头：导航条是 fixed + 独立合成层，
     让它在根层叠上下文里最后绘制，任何页面内容（卡片里的 WebGL 画布、
     3D 变换）都不可能再压到它上面。 */
  document.body.append(iconbar);

  /* 往下滑动时导航条从长收短。 */
  const onScroll = () => {
    iconbar.classList.toggle("is-compact", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const sidebar = document.getElementById("sidebar");
/* 板块入口在图标栏；侧边栏承载板块内的上下文列表 — 组件页是组件清单，
   文档页是分组文档导航。 */
const isDocs = here === "docs.html";
const isStyle = here === "style.html";
const withSidebar = Boolean(sidebar) && (inComponents || isDocs || isStyle);
layout?.classList.toggle("no-subnav", !withSidebar);
if (withSidebar) {
  const nav = document.createElement("nav");

  if (inComponents) {
    /* 组件条目来自登记表：顶部一排分类图标过滤列表。新组件登记到
       docs/registry.jsx 并归入 CATEGORIES 的对应分类即自动出现 */
    const byId = new Map(COMPONENTS.map((c) => [c.id, c]));

    const CAT_ICONS = {
      all: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/></svg>',
      text: '<span class="side-cat-aa" aria-hidden="true">Aa</span>',
      control: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="2.5" y="7" width="19" height="10" rx="5"/><circle cx="16" cy="12" r="3.2" fill="currentColor" stroke="none"/></svg>',
      motion: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M5 2v17.5l5.2-4.7 3.1 6.9 2.7-1.2-3.1-6.9 7-1z"/></svg>',
      layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2.5"/><path d="M5 15H4.5A1.5 1.5 0 0 1 3 13.5v-9A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5V5"/></svg>',
      graphic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 15.5-4.5-4.5L7 20"/></svg>',
    };

    const finder = document.createElement("div");
    finder.className = "side-finder";

    const cats = document.createElement("div");
    cats.className = "side-cats";
    cats.setAttribute("role", "group");
    cats.setAttribute("aria-label", "按分类筛选组件");
    /* Restore the last picked category across navigations. */
    const savedFilter = (() => {
      try {
        const saved = JSON.parse(sessionStorage.getItem("solen:sidebar-filter"));
        const valid = saved && (saved.categoryId === "all" || CATEGORIES.some((c) => c.id === saved.categoryId));
        return valid ? saved.categoryId : null;
      } catch {
        return null;
      }
    })();
    const catState = { id: savedFilter ?? "all" };
    const catButtons = new Map();
    for (const cat of [{ id: "all", label: "全部" }, ...CATEGORIES]) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "side-cat" + (cat.id === catState.id ? " is-on" : "");
      b.title = cat.label;
      b.setAttribute("aria-label", cat.label);
      b.setAttribute("aria-pressed", String(cat.id === catState.id));
      b.innerHTML = CAT_ICONS[cat.id];
      b.addEventListener("click", () => {
        catState.id = cat.id;
        for (const [id, button] of catButtons) {
          button.classList.toggle("is-on", id === catState.id);
          button.setAttribute("aria-pressed", String(id === catState.id));
        }
        render();
        emitFilter();
      });
      cats.append(b);
      catButtons.set(cat.id, b);
    }

    finder.append(cats);
    sidebar.append(finder);

    /* 分类变化时持久化并广播给页面（画廊网格监听同一事件，初始
       状态各自从 sessionStorage 读，避免模块加载顺序的竞态） */
    const emitFilter = () => {
      sessionStorage.setItem("solen:sidebar-filter", JSON.stringify({ categoryId: catState.id }));
      window.dispatchEvent(new CustomEvent("solen:filter", { detail: { categoryId: catState.id } }));
    };

    function render() {
      const keepScroll = nav.scrollTop;
      nav.textContent = "";

      const list = catState.id === "all"
        ? COMPONENTS
        : CATEGORIES.find((category) => category.id === catState.id).items.map((id) => byId.get(id));
      for (const component of list) {
        const a = document.createElement("a");
        a.className = "nav-item";
        a.href = component.href;
        a.textContent = component.name;
        if (component.href === here) a.classList.add("active");
        nav.append(a);
      }
      nav.scrollTop = keepScroll;
    }
    render();
  } else if (isDocs) {
    /* 文档页 — 正文切换不跳页，右侧目录取当前文档的 h3 小节。
       新文档在 docs.html 加一个 data-doc 小节，再往下面侧边栏 items 里登记。 */
    const article = document.getElementById("docs-body");
    const toc = document.querySelector(".toc");
    const tocNav = toc?.querySelector("nav");
    const docs = article ? [...article.querySelectorAll("[data-doc]")] : [];
    let activeDoc = "欢迎使用";
    const showDoc = (key) => {
      for (const el of docs) el.hidden = el.dataset.doc !== key;
      if (tocNav) {
        tocNav.textContent = "";
        const active = docs.find((el) => el.dataset.doc === key);
        const heads = active ? [...active.querySelectorAll("h3")] : [];
        /* 先清掉上一篇留下的锚点 id，避免重复 id 让定位串台。 */
        for (const el of article.querySelectorAll("h3[id]")) el.removeAttribute("id");
        for (const [i, h] of heads.entries()) {
          h.id = `doc-h3-${i}`;
          const a = document.createElement("a");
          a.href = `#${h.id}`;
          a.textContent = h.textContent;
          tocNav.append(a);
        }
        if (toc) toc.hidden = heads.length === 0;
      }
      window.scrollTo({ top: 0 });
      /* 同步分叉导航菜单的选中态（组件挂载后监听）。 */
      activeDoc = key;
      window.dispatchEvent(new CustomEvent("docs:doc", { detail: key }));
    };

    /* 侧边栏用「分叉导航菜单」：叶子选文档，分组可折叠。React 组件按需
       动态引入，不拖累其他页面；颜色走站点令牌，明暗主题自动跟随。 */
    (async () => {
      const React = await import("react");
      const { createRoot } = await import("react-dom/client");
      const { default: BranchedMenu } = await import(
        "../src/components/branched-menu/BranchedMenu.jsx"
      );
      sidebar.textContent = "";
      const mount = document.createElement("div");
      sidebar.append(mount);
      const items = [
        { value: "欢迎使用", label: "欢迎使用" },
        {
          label: "作者有话说",
          children: [
            { value: "我是谁", label: "我是谁" },
            { value: "为什么", label: "我为什么做它" },
          ],
        },
        {
          label: "站点",
          children: [
            { value: "MCP", label: "MCP" },
            { value: "Skill", label: "Skill" },
            { value: "更新日志", label: "更新日志" },
          ],
        },
      ];
      function SidebarNav() {
        const [doc, setDoc] = React.useState(activeDoc);
        React.useEffect(() => {
          const onDoc = (e) => setDoc(e.detail);
          window.addEventListener("docs:doc", onDoc);
          return () => window.removeEventListener("docs:doc", onDoc);
        }, []);
        return React.createElement(BranchedMenu, {
          key: doc,
          items,
          defaultOpen: [0, 1, 2],
          defaultActive: doc,
          onSelect: (value) => showDoc(value),
          color: "var(--sd-ink)",
          accentColor: "var(--ios-blue)",
          lineColor: "var(--ios-separator)",
          width: 220,
          fontSize: 13,
          rowHeight: 32,
        });
      }
      createRoot(mount).render(React.createElement(SidebarNav));
    })();

    showDoc("欢迎使用");

    /* 正文里的文档切换链接：<a data-doc-link="docKey">，原地换文档。 */
    article?.addEventListener("click", (e) => {
      const a = e.target.closest("a[data-doc-link]");
      if (!a) return;
      e.preventDefault();
      showDoc(a.dataset.docLink);
    });
  }

  /* 文档页的侧边栏是 React 挂载的分叉导航菜单，不走静态 nav 与滚动记忆。 */
  if (!isDocs) {
    sidebar.append(nav);

    /* The nav is the scroll container (the rail itself never scrolls), so keep
       it where the reader left it — picking an item navigates, and the
       rebuilt list would otherwise jump back to the top. */
    const SCROLL_KEY = "solen:sidebar-scroll";
    const saved = Number(sessionStorage.getItem(SCROLL_KEY));
    if (saved) {
      requestAnimationFrame(() => {
        nav.scrollTop = saved;
        /* Keep the current entry in view if it fell outside the restored
           window, without snapping the list back to the top. */
        const active = nav.querySelector(".nav-item.active");
        if (active) {
          const box = nav.getBoundingClientRect();
          const item = active.getBoundingClientRect();
          if (item.top < box.top || item.bottom > box.bottom) {
            active.scrollIntoView({ block: "nearest" });
          }
        }
      });
    }
    let pending = false;
    nav.addEventListener(
      "scroll",
      () => {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
          sessionStorage.setItem(SCROLL_KEY, String(nav.scrollTop));
          pending = false;
        });
      },
      { passive: true },
    );
  }
} else {
  sidebar?.remove();
}
