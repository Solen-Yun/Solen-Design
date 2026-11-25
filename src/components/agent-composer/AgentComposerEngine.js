/* Solen Design — Agent 对话输入框与模型思考强度菜单：自包含交互核心。
   引擎只依赖 gsap；样式随组件内嵌，挂载到宿主的 shadow root。 */

import { gsap } from "gsap";

/* 场景用色 —— 明亮基调，组件内自持，不读外部样式。 */
const TOKENS = {
  "--theme-accent": "#339CFF",
  "--theme-accent-hover": "#2563EB",
  "--theme-bg": "#FFFFFF",
  "--theme-elevated": "#FFFFFF",
  "--theme-fg": "#1F2937",
  "--theme-text-secondary": "#707784",
  "--theme-border": "#E6E8EC",
  "--theme-hover": "#F4F4F6",
  "--theme-selection": "#DCEBFE",
};

const DEFAULT_MODELS = ["标准模型", "推理模型"];
const THINKING_STOPS = [
  { value: "simple", label: "简单" },
  { value: "medium", label: "中度" },
  { value: "deep", label: "深度" },
];
const THINKING_ICONS = { simple: "feather", medium: "lightbulb", deep: "brain" };
const PERMISSION_OPTIONS = [
  { id: "default", label: "请求批准", desc: "编辑外部文件和使用互联网时始终询问", icon: "hand" },
  { id: "auto", label: "替我审批", desc: "仅对检测到的风险操作请求批准", icon: "shield" },
  { id: "full", label: "完全访问权限", desc: "可不受限制地访问互联网和您电脑上的任何文件", icon: "alert" },
];
const MENTION_MARKER = "";
const MAX_ATTACHMENTS = 5;
const TEXTAREA_MIN_HEIGHT = 60;
const TEXTAREA_MAX_HEIGHT = 300;
const OPEN_SHADOW = "0 6px 24px rgba(0,0,0,0.10)";
const APPROVAL_SHADOW = "0 4px 12px rgba(0,0,0,0.08)";

/* 弹簧参数：菜单开合共用一套。 */
const MORPH_MOTION = {
  open: {
    width: { stiffness: 306.25, damping: 28, duration: 0.7, delay: 0 },
    height: { stiffness: 196, damping: 18.34, duration: 0.86, delay: 0.057 },
  },
  close: {
    width: { stiffness: 400, damping: 33, duration: 0.64, delay: 0.07 },
    height: { stiffness: 600.25, damping: 40, duration: 0.62, delay: 0 },
  },
};

/* 图标：统一 24×24 线条几何，内嵌绘制，不加载图标库。 */
const icon = (inner, size = 16) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
const ICONS = {
  plus: (s) => icon('<path d="M12 5v14M5 12h14"/>', s),
  arrowUp: (s) => icon('<path d="M12 19V5M5 12l7-7 7 7"/>', s),
  stop: (s) => icon('<rect x="7" y="7" width="10" height="10" rx="1.5" fill="currentColor" stroke="none"/>', s),
  spinner: (s) => icon('<path d="M12 3a9 9 0 1 0 9 9"/>', s),
  x: (s) => icon('<path d="M6 6l12 12M18 6L6 18"/>', s),
  check: (s) => icon('<path d="M4 12.5l5 5L20 6.5"/>', s),
  chevronDown: (s) => icon('<path d="M6 9l6 6 6-6"/>', s),
  file: (s) => icon('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>', s),
  fileLines: (s) => icon('<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>', s),
  hand: (s) => icon('<path d="M8 12.5V6a1.4 1.4 0 0 1 2.8 0v5"/><path d="M10.8 11V4.6a1.4 1.4 0 0 1 2.8 0V11"/><path d="M13.6 11V6a1.4 1.4 0 0 1 2.8 0v7"/><path d="M16.4 13v-2a1.4 1.4 0 0 1 2.8 0v3.2c0 3.3-2.7 6-6 6h-.9a5.5 5.5 0 0 1-4.8-2.8l-1.7-3a1.4 1.4 0 0 1 2.4-1.4l1.2 2"/>', s),
  shield: (s) => icon('<path d="M12 3l7 2.6v5.1c0 4.6-3 7.7-7 9.3-4-1.6-7-4.7-7-9.3V5.6z"/><path d="M12 3v17"/>', s),
  alert: (s) => icon('<circle cx="12" cy="12" r="9"/><path d="M12 7.5V13"/><path d="M12 16.5h.01"/>', s),
  feather: (s) => icon('<path d="M20.2 12.2a6 6 0 0 0-8.5-8.5L5 10.5V19h8.5z"/><path d="M16 8L2 22"/><path d="M17.5 15H9"/>', s),
  lightbulb: (s) => icon('<path d="M9.5 18h5"/><path d="M10.5 21h3"/><path d="M12 3a6 6 0 0 1 3.6 10.8c-.7.5-1.1 1.3-1.3 2.2h-4.6c-.2-.9-.6-1.7-1.3-2.2A6 6 0 0 1 12 3z"/>', s),
  brain: (s) => icon('<path d="M9.5 3a3 3 0 0 0-3 3 3.5 3.5 0 0 0-2.3 5.4A3.5 3.5 0 0 0 6.5 17a3 3 0 0 0 3 3c1 0 1.9-.4 2.5-1.1.6.7 1.5 1.1 2.5 1.1a3 3 0 0 0 3-3 3.5 3.5 0 0 0 2.3-5.6A3.5 3.5 0 0 0 17.5 6a3 3 0 0 0-3-3c-1 0-1.9.4-2.5 1.1C11.4 3.4 10.5 3 9.5 3z"/><path d="M12 4.1V19"/>', s),
  paperclip: (s) => icon('<path d="M21 11.3l-8.9 8.9a5.5 5.5 0 0 1-7.8-7.8l8.3-8.3a3.7 3.7 0 0 1 5.2 5.2l-8.1 8.1a1.8 1.8 0 0 1-2.6-2.6l7.8-7.7"/>', s),
  bullseye: (s) => icon('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/>', s),
  listCheck: (s) => icon('<path d="M10 6.5h11M10 12h11M10 17.5h11"/><path d="M3 6.5l1.2 1.2L6.5 5.4"/><path d="M3 12l1.2 1.2 2.3-2.3"/><path d="M3 17.5l1.2 1.2 2.3-2.3"/>', s),
  cube: (s) => icon('<path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7z"/><path d="M3.3 7L12 12l8.7-5"/><path d="M12 22V12"/>', s),
  folder: (s) => icon('<path d="M4 5h5l2 2h9a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/>', s),
  image: (s) => icon('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.4"/><path d="M21 15.5l-4.5-4.5L7 20.5"/>', s),
  circleCheck: (s) => icon('<circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 5-5.5"/>', s),
  circleInfo: (s) => icon('<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>', s),
};

const CSS = `
:host{display:block}
*,*::before,*::after{box-sizing:border-box}
[hidden]{display:none!important}
.solen-stage{position:relative;display:flex;align-items:center;justify-content:center;min-height:var(--motion-height,600px);padding:24px 16px;background:var(--theme-bg);color:var(--theme-fg);font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Microsoft YaHei",sans-serif}
.solen-composer{position:relative;width:100%;max-width:768px}
.solen-card{position:relative;display:flex;flex-direction:column;border-radius:24px;corner-shape:superellipse(1.6);background:var(--theme-elevated);box-shadow:0 8px 24px rgba(31,38,48,.09);transition:box-shadow 300ms ease-out}
@supports not (corner-shape: superellipse(1.6)){.solen-card{border-radius:24px}}
.solen-card:focus-within{box-shadow:0 10px 30px rgba(31,38,48,.13)}
.solen-card-inner{position:relative;display:flex;flex-direction:column;width:100%;padding:14px 14px 10px}
.solen-suggest{position:absolute;display:none;left:0;right:0;bottom:calc(100% + 8px);z-index:50;overflow:hidden;padding:6px;border-radius:16px;corner-shape:superellipse(1.6);background:var(--theme-elevated);box-shadow:${OPEN_SHADOW};outline:1px solid color-mix(in srgb,var(--theme-fg) 8%,transparent);outline-offset:-1px}
.solen-suggest-scroll{overflow-y:auto;overscroll-behavior:contain;max-height:240px;scrollbar-width:thin}
.solen-suggest-label{padding:6px 8px;font-size:12px;font-weight:500;color:var(--theme-text-secondary)}
.solen-suggest-row,.solen-slash-row{position:relative;z-index:1;display:grid;grid-template-columns:18px minmax(0,1fr);align-items:center;gap:10px;padding:8px;text-align:left;font-size:13px;color:var(--theme-text-secondary);transition:color 150ms;cursor:pointer}
.solen-suggest-row[data-selected],.solen-slash-row[data-selected]{font-weight:500;color:var(--theme-fg)}
.solen-suggest-row .solen-suggest-icon{display:flex;align-items:center;justify-content:center;width:16px;height:16px;color:var(--theme-fg)}
.solen-suggest-row .solen-suggest-title{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;color:var(--theme-fg)}
.solen-suggest-row .solen-suggest-desc{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;color:var(--theme-text-secondary)}
.solen-slash-row{grid-template-columns:130px minmax(0,1fr) 64px}
.solen-seltext{background:var(--theme-accent);color:#fff;border-radius:2px}
.solen-slash-row .solen-slash-title{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;color:var(--theme-fg)}
.solen-slash-row .solen-slash-desc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;line-height:1.4;color:var(--theme-text-secondary)}
.solen-slash-row .solen-slash-cat{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:right;font-size:11px;color:var(--theme-text-secondary)}
.solen-plan-pill{display:inline-flex;align-items:center;gap:6px;width:fit-content;margin-bottom:8px;padding:6px 12px;border-radius:999px;background:rgba(217,119,6,.1);font-size:11px;font-weight:500;color:#b45309}
.solen-plan-pill svg{width:10px;height:10px}
.solen-attach-row{display:none;align-items:flex-start;gap:10px;max-width:100%;margin:0 -4px 8px;padding:6px 4px 4px;overflow-x:auto;scrollbar-width:thin}
.solen-attach-image{position:relative;display:flex;flex-shrink:0;width:68px;height:68px}
.solen-attach-image-trigger{position:relative;display:block;width:100%;height:100%;padding:0;border:0;border-radius:10px;background:transparent;cursor:zoom-in;overflow:hidden}
.solen-attach-image-trigger img{display:block;width:100%;height:100%;object-fit:cover}
.solen-attach-image-trigger:hover::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.1)}
.solen-attach-image-tile{display:flex;align-items:center;justify-content:center;width:100%;height:100%;border:1px solid var(--theme-border);border-radius:10px;background:color-mix(in srgb,var(--theme-fg) 5%,transparent);color:var(--theme-text-secondary)}
.solen-attach-status{position:absolute;left:4px;right:4px;bottom:4px;display:flex;align-items:center;justify-content:center;gap:2px;padding:2px;border-radius:6px;background:var(--theme-elevated);font-size:10px;line-height:16px;color:var(--theme-text-secondary);pointer-events:none}
.solen-attach-status[data-failed]{color:#dc4b41}
.solen-attach-status svg{flex-shrink:0;width:12px;height:12px}
.solen-attach-remove{position:absolute;right:-4px;top:-4px;z-index:10;display:none;align-items:center;justify-content:center;width:20px;height:20px;padding:0;border:2px solid var(--theme-elevated);border-radius:999px;background:#525252;color:#fff;cursor:pointer}
.solen-attach-image:hover .solen-attach-remove,.solen-attach-file:hover .solen-attach-remove,.solen-attach-remove:focus-visible{display:inline-flex}
.solen-attach-file{position:relative;display:flex;flex-shrink:0;align-items:center;gap:8px;height:56px;max-width:220px;padding:0 8px;border-radius:16px;background:rgba(0,0,0,.05);text-align:left}
.solen-attach-file-tile{display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;background:#fff;color:var(--theme-text-secondary)}
.solen-attach-file-name{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12px;font-weight:500;color:var(--theme-fg)}
.solen-attach-file-status{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;color:var(--theme-text-secondary)}
.solen-attach-file .solen-attach-remove{position:static;display:inline-flex;border:0;width:24px;height:24px;background:transparent;color:var(--theme-text-secondary)}
.solen-attach-file .solen-attach-remove:hover{background:color-mix(in srgb,var(--theme-fg) 5%,transparent);color:var(--theme-fg)}
.solen-editor{position:relative;width:100%}
.solen-mirror{position:absolute;inset:0;overflow:hidden;pointer-events:none;white-space:pre-wrap;overflow-wrap:break-word;font-size:14px;line-height:24px;color:var(--theme-fg)}
.solen-textarea{position:relative;z-index:10;display:block;width:100%;min-height:60px;max-height:300px;padding:0;border:0;resize:none;overflow:hidden;background:transparent;font:inherit;font-size:14px;line-height:24px;color:transparent;outline:none;scrollbar-width:thin}
.solen-textarea::selection{background:transparent;color:transparent}
.solen-textarea::placeholder{color:transparent}
.solen-textarea[data-empty]{caret-color:var(--theme-fg)}
.solen-caret{display:inline-block;width:1px;height:1.25em;margin:0 -.5px;vertical-align:-.2em;background:var(--theme-fg);animation:solen-caret-blink 1.05s steps(1) infinite}
@keyframes solen-caret-blink{0%,52%{opacity:1}53%,100%{opacity:0}}
.solen-chip{display:inline-flex;align-items:center;gap:4px;max-width:220px;height:20px;margin:0 2px;padding:0 4px;border-radius:3px;font-size:13px;font-weight:500;line-height:20px;vertical-align:baseline}
.solen-chip[data-kind="mention"]{background:rgba(0,0,0,.05);color:var(--theme-fg)}
.solen-chip[data-selected]{background:var(--theme-accent);color:#fff}
.solen-chip svg{width:11px;height:11px;color:var(--theme-text-secondary)}
.solen-chip[data-selected] svg{color:inherit}
.solen-chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.solen-placeholder{color:#9ca3af}
.solen-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:12px;row-gap:8px;min-height:32px;margin-top:10px}
.solen-primary-tools{display:flex;align-items:center;gap:6px;min-width:0;flex:1 1 auto;overflow:visible}
.solen-model-tools{display:flex;align-items:center;gap:8px;height:32px;min-width:0;flex:0 1 auto}
.solen-icon-btn{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;flex-shrink:0;padding:0;border:0;border-radius:999px;corner-shape:round;background:color-mix(in srgb,var(--theme-fg) 5%,transparent);color:var(--theme-text-secondary);cursor:pointer;transition:background-color 150ms,color 150ms}
.solen-icon-btn:hover{background:color-mix(in srgb,var(--theme-fg) 10%,transparent);color:var(--theme-fg)}
.solen-icon-btn:disabled{cursor:not-allowed;opacity:.4}
.solen-icon-btn:disabled:hover{background:color-mix(in srgb,var(--theme-fg) 5%,transparent);color:var(--theme-text-secondary)}
.solen-icon-btn svg{width:11px;height:11px}
.solen-anchor{position:relative;display:inline-flex;align-items:center;max-width:100%;min-width:0;height:32px}
.solen-morph-shell{position:relative;display:inline-flex;max-width:100%;border-radius:999px}
.solen-menu-panel{position:absolute;left:0;top:0;width:max-content;max-width:calc(100vw - 32px);border-radius:16px;corner-shape:superellipse(1.6);background:var(--theme-elevated);opacity:0;pointer-events:none}
.solen-menu-panel[data-align="right"]{left:auto;right:0}
.solen-menu-inner{min-width:0;max-width:calc(100vw - 32px)}
.solen-menu-section{display:flex;align-items:center;padding:4px 0;font-size:12px}
.solen-menu-section span{font-weight:500;color:var(--theme-fg)}
.solen-menu-pad{padding:0 12px 4px}
.solen-menu-list{position:relative;width:100%;max-height:96px;overflow-y:auto;scrollbar-width:thin;padding:2px 0}
.solen-menu-row{position:relative;z-index:1;display:flex;align-items:center;width:100%;padding:8px 10px;border-radius:8px;font-size:12px;color:var(--theme-text-secondary);cursor:pointer;text-align:left;transition:color 150ms}
.solen-menu-row strong{font-weight:500}
.solen-menu-row[aria-checked="true"]{color:var(--theme-fg)}
.solen-menu-row .solen-menu-check{display:none;margin-left:12px;color:var(--theme-fg)}
.solen-menu-row[aria-checked="true"] .solen-menu-check{display:inline-flex}
.solen-menu-row .solen-menu-check svg{width:10px;height:10px}
.solen-sliding-pill{position:absolute;left:0;right:0;z-index:0;border-radius:8px;background:color-mix(in srgb,var(--theme-fg) 5%,transparent);pointer-events:none;opacity:0;transition:top 300ms ease-out,height 300ms ease-out,opacity 300ms ease-out}
.solen-sliding-pill[data-ready]{opacity:1}
.solen-menu-divider{flex-shrink:0;height:1px;margin:8px 12px;background:var(--theme-border);opacity:.55}
.solen-effort-block{padding:2px 12px 4px}
.solen-effort-block .solen-effort-title{display:flex;align-items:center;margin-bottom:10px;font-size:12px}
.solen-effort-block .solen-effort-title span{font-weight:500;color:var(--theme-fg)}
.solen-approval-panel{padding:6px}
.solen-approval-row{position:relative;z-index:1;display:flex;align-items:flex-start;gap:7px;width:100%;padding:8px;border-radius:12px;text-align:left;cursor:pointer;transition:color 150ms;color:var(--theme-fg)}
.solen-approval-row strong{font-size:12px;font-weight:500;line-height:17px;padding-right:14px}
.solen-approval-row small{display:block;margin-top:2px;font-size:11px;line-height:15px;color:#8c8c8c}
.solen-approval-row .solen-approval-icon{display:flex;justify-content:center;flex-shrink:0;width:12px;margin-top:2px;color:var(--theme-text-secondary)}
.solen-approval-row .solen-approval-icon svg{width:12px;height:12px}
.solen-approval-row .solen-menu-check{position:absolute;right:8px;top:11px;display:none;color:var(--theme-text-secondary)}
.solen-approval-row .solen-menu-check svg{width:10px;height:10px}
.solen-approval-row[aria-checked="true"] .solen-menu-check{display:inline-flex}
.solen-approval-row[data-full]{color:#e25507}
.solen-approval-row[data-full] .solen-approval-icon,.solen-approval-row[data-full] .solen-menu-check{color:#e25507}
.solen-approval-row[data-full] small{color:rgba(226,85,7,.8)}
.solen-approval-pill{border-radius:12px;background:#f5f5f5}
.solen-approval-pill[data-full]{background:rgba(226,85,7,.1)}
.solen-perm-trigger{display:inline-flex;align-items:center;gap:0;height:32px;max-width:100%;min-width:0;flex-shrink:1;padding:0 12px;border:0;border-radius:999px;background:rgba(0,0,0,.05);color:var(--theme-text-secondary);font:inherit;font-size:11px;font-weight:500;white-space:nowrap;cursor:pointer;transition:background-color 150ms,color 150ms}
.solen-perm-trigger:hover{background:rgba(0,0,0,.1);color:var(--theme-fg)}
.solen-perm-trigger svg{flex-shrink:0}
.solen-perm-trigger .solen-perm-icon{width:12px;height:12px;margin-right:6px}
.solen-perm-trigger .solen-perm-chevron{width:10px;height:10px;margin-left:4px}
.solen-perm-trigger[data-full]{background:rgba(226,85,7,.1);color:#e25507}
.solen-perm-trigger[data-full]:hover{background:rgba(226,85,7,.18)}
.solen-perm-trigger .solen-perm-label{overflow:hidden;text-overflow:ellipsis;min-width:0}
.solen-capsule{display:inline-flex;align-items:center;height:32px;max-width:210px;min-width:0;flex-shrink:1;padding:0 12px;border:0;border-radius:999px;background:color-mix(in srgb,var(--theme-fg) 5%,transparent);color:var(--theme-fg);font:inherit;font-size:12px;cursor:pointer;transition:background-color 150ms}
.solen-capsule:hover{background:color-mix(in srgb,var(--theme-fg) 10%,transparent)}
.solen-capsule:disabled{cursor:not-allowed;opacity:.5}
.solen-capsule .solen-capsule-icon{width:12px;height:12px;margin-right:6px;color:var(--theme-text-secondary)}
.solen-capsule .solen-capsule-model{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:500;min-width:0}
.solen-capsule .solen-capsule-thinking{flex-shrink:0;margin-left:6px;color:var(--theme-text-secondary)}
.solen-capsule .solen-capsule-chevron{width:10px;height:10px;margin-left:8px;flex-shrink:0;color:var(--theme-text-secondary)}
.solen-send{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;flex-shrink:0;padding:0;border:0;border-radius:999px;corner-shape:round;background:color-mix(in srgb,var(--theme-fg) 22%,transparent);color:color-mix(in srgb,var(--theme-bg) 90%,var(--theme-fg));cursor:not-allowed;transition:background-color 150ms,color 150ms}
.solen-send svg{width:11px;height:11px}
.solen-send[data-ready]{cursor:pointer;background:var(--theme-fg);color:var(--theme-bg)}
.solen-send[data-ready]:hover{background:color-mix(in srgb,var(--theme-fg) 88%,var(--theme-bg))}
.solen-send[data-spin] svg{width:14px;height:14px;animation:solen-spin 1s linear infinite}
@keyframes solen-spin{to{transform:rotate(360deg)}}
.solen-ring-btn{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;flex-shrink:0;padding:0;border:0;border-radius:999px;background:transparent;color:var(--theme-text-secondary);cursor:pointer;transition:background-color 150ms}
.solen-ring-btn:hover{background:color-mix(in srgb,var(--theme-fg) 5%,transparent)}
.solen-ring{display:block;width:16px;height:16px}
.solen-ring .solen-ring-trail{stroke:color-mix(in srgb,var(--theme-text-secondary) 30%,var(--theme-bg))}
.solen-ring .solen-ring-path{transition:stroke-dashoffset 300ms}
.solen-popover{position:absolute;z-index:60;width:240px;padding:12px 14px;border-radius:16px;corner-shape:superellipse(1.6);background:var(--theme-elevated);box-shadow:${OPEN_SHADOW};outline:1px solid color-mix(in srgb,var(--theme-fg) 8%,transparent);outline-offset:-1px}
.solen-popover-head{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:13px;font-weight:600}
.solen-popover-head strong{font-size:18px;line-height:1}
.solen-popover-sub{margin-top:6px;font-size:13px;color:var(--theme-text-secondary)}
.solen-toast-host{position:absolute;top:16px;left:0;right:0;z-index:200;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none}
.solen-toast{display:flex;align-items:center;gap:10px;max-width:480px;padding:10px 16px;border:1px solid var(--theme-border);border-radius:8px;background:#fff;box-shadow:0 6px 24px rgba(0,0,0,.12);font-size:13px;color:var(--theme-fg)}
.solen-toast svg{width:14px;height:14px;flex-shrink:0}
.solen-toast[data-type="success"] svg{color:#22c55e}
.solen-toast[data-type="error"] svg,.solen-toast[data-type="warning"] svg{color:#dc4b41}
.solen-toast[data-type="info"] svg{color:#3b82f6}
.solen-tooltip{position:absolute;z-index:300;max-width:280px;padding:4px 8px;border-radius:8px;background:var(--theme-fg);color:var(--theme-bg);font-size:12px;line-height:18px;pointer-events:none;opacity:0;transition:opacity 150ms}
.solen-tooltip[data-show]{opacity:1}
.solen-modal{position:absolute;inset:0;z-index:220;display:flex;align-items:center;justify-content:center}
.solen-modal-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.85)}
.solen-modal-img{position:relative;max-height:75%;max-width:80%;border-radius:8px;object-fit:contain;box-shadow:0 25px 50px -12px rgba(0,0,0,.25)}
.solen-modal-close{position:absolute;right:12px;top:12px;z-index:10;display:flex;align-items:center;justify-content:center;width:36px;height:36px;padding:0;border:0;border-radius:999px;background:rgba(0,0,0,.55);color:#fff;cursor:pointer;transition:background-color 150ms}
.solen-modal-close:hover{background:rgba(0,0,0,.75)}
.solen-modal-close svg{width:20px;height:20px}
.solen-scrollbar::-webkit-scrollbar{width:6px;height:6px}
.solen-scrollbar::-webkit-scrollbar-thumb{border-radius:999px;background:color-mix(in srgb,var(--theme-fg) 18%,transparent)}
.solen-effort{--effort-ratio:0;--effort-hue:calc(210 + var(--effort-ratio)*var(--effort-ratio)*63);min-width:0}
.solen-effort-track{position:relative;display:block;width:100%;height:30px;padding:0;border:0;border-radius:999px;corner-shape:round;background:color-mix(in srgb,var(--theme-fg) 10%,var(--theme-bg));overflow:hidden;cursor:grab;touch-action:none;appearance:none;font:inherit}
.solen-effort[data-dragging] .solen-effort-track{cursor:grabbing}
.solen-effort-track:focus-visible{outline:2px solid color-mix(in srgb,var(--theme-fg) 60%,transparent);outline-offset:2px}
.solen-effort-fill{position:absolute;inset:0;pointer-events:none;clip-path:inset(0 calc((100% - 32px)*(1 - var(--effort-ratio))) 0 0 round 999px)}
.solen-effort-fill canvas{width:100%;height:100%;display:block}
.solen-effort-dots{position:absolute;inset:0 16px;display:flex;align-items:center;justify-content:space-between;pointer-events:none;transition:opacity 300ms}
.solen-effort-dots span{width:4px;height:4px;border-radius:50%;corner-shape:round;background:color-mix(in srgb,var(--theme-fg) 30%,transparent)}
.solen-effort[data-maximum] .solen-effort-dots{opacity:0}
.solen-effort-thumb{position:absolute;left:calc((100% - 32px)*var(--effort-ratio) + 3px);top:2px;width:26px;height:26px;border-radius:var(--effort-jelly-left,50%) var(--effort-jelly-right,50%) var(--effort-jelly-right,50%) var(--effort-jelly-left,50%)/50%;corner-shape:round;border:1px solid color-mix(in srgb,var(--theme-fg) 10%,transparent);background:#fafafa;box-shadow:0 1px 3px #0002;pointer-events:none;scale:var(--effort-press,1);transform:translateX(var(--effort-jelly-offset,0px)) skewX(var(--effort-jelly-skew,0deg)) scale(var(--effort-jelly-x,1),var(--effort-jelly-y,1));transform-origin:center;transition:border-color 180ms,box-shadow 180ms}
.solen-effort-track:hover .solen-effort-thumb{border-color:color-mix(in srgb,var(--theme-fg) 20%,transparent)}
.solen-effort[data-dragging] .solen-effort-thumb{transition-duration:0ms;box-shadow:0 2px 5px #0003}
.solen-effort-stops{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));align-items:center;margin-top:6px;font-size:11px}
.solen-effort-stops button{min-width:32px;justify-self:center;padding:3px 2px;background:transparent;border:0;color:var(--theme-text-secondary);cursor:pointer;font:inherit;font-size:11px;border-radius:calc(3px*var(--solen-corner-scale,1.6))}
.solen-effort-stops button:first-child{justify-self:start}
.solen-effort-stops button:last-child{justify-self:end}
.solen-effort-stops button[aria-pressed="true"]{color:hsl(var(--effort-hue) 75% 43%);font-weight:600}
.solen-effort-stops button:focus-visible{outline:2px solid var(--theme-fg);outline-offset:2px}
.solen-effort[data-disabled]{opacity:.5;pointer-events:none}
`;

/* 阻尼弹簧近似为缓动函数：springEase(stiffness, damping, duration)。 */
function springEase(stiffness, damping, duration) {
  const decay = damping / 2;
  const frequency = Math.sqrt(stiffness - decay * decay);
  return (progress) => {
    if (progress === 0 || progress === 1) return progress;
    const time = progress * duration;
    return 1 - Math.exp(-decay * time) * (Math.cos(frequency * time) + (decay / frequency) * Math.sin(frequency * time));
  };
}

/* 位置滑行的采样弹簧曲线（500ms 不超调）。 */
const SPRING = [
  [0, 0], [0.02, 0.015], [0.04, 0.0532], [0.06, 0.1065], [0.08, 0.1686],
  [0.1, 0.2351], [0.13, 0.3363], [0.16, 0.4332], [0.2, 0.5495], [0.24, 0.648],
  [0.28, 0.7287], [0.33, 0.807], [0.38, 0.8646], [0.44, 0.9128], [0.5, 0.9447],
  [0.57, 0.968], [0.65, 0.9834], [0.74, 0.9924], [0.85, 0.9975], [1, 1],
];
const glideEase = (progress) => {
  const end = SPRING.findIndex(([x]) => x >= progress);
  if (end <= 0) return end === 0 ? 0 : 1;
  const [x0, y0] = SPRING[end - 1];
  const [x1, y1] = SPRING[end];
  return y0 + ((y1 - y0) * (progress - x0)) / (x1 - x0);
};
const returnEase = springEase(400, 23, 0.72);

/* 轨道星场：对角柔光带 + 64 个星点，相位随强度与拖速积分推进。 */
function createEffortField(canvas, getRatio) {
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let phase = 0;
  let lastTime = 0;
  const stars = Array.from({ length: 64 }, (_, i) => ({
    x: (i * 0.61803398875) % 1,
    y: (i * 0.754877666) % 1,
    size: 0.35 + (i % 5) * 0.13,
    speed: 0.3 + (i % 7) * 0.1,
  }));
  const resize = () => {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const draw = (time = 0, still = false, motionBoost = 1) => {
    if (!ctx || width <= 0 || height <= 0) return;
    const ratio = getRatio();
    if (!still) phase += Math.min(Math.max(time - lastTime, 0), 0.05) * (0.16 + ratio * 0.85) * Math.max(1, motionBoost);
    lastTime = time;
    const hue = 210 + ratio * ratio * 63;
    const fill = 32 + (width - 32) * ratio;
    ctx.clearRect(0, 0, width, height);
    const base = ctx.createLinearGradient(0, 0, Math.max(fill, 32), 0);
    base.addColorStop(0, "#30343a");
    base.addColorStop(0.28, `hsl(${hue - 12} 38% 47%)`);
    base.addColorStop(0.65, `hsl(${hue} 79% 70%)`);
    base.addColorStop(1, `hsl(${hue + 5} 88% 70%)`);
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, width, height);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    for (let band = 0; band < 7; band++) {
      ctx.beginPath();
      for (let x = 0; x <= width + 4; x += 4) {
        const y = height * (0.12 + band * 0.15) + Math.sin(x * 0.034 + phase + band * 1.8) * 5 + Math.sin(x * 0.079 - phase * 0.6 + band) * 2 - x * 0.035;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.lineWidth = 2 + (band % 3) * 2;
      ctx.strokeStyle = `hsla(${hue + band * 2} 90% 87% / ${0.06 + ratio * 0.025})`;
      ctx.stroke();
    }
    const glowX = fill * (0.6 + Math.sin(phase * 0.7) * 0.12);
    const glow = ctx.createRadialGradient(glowX, height * 0.7, 0, glowX, height * 0.7, 46);
    glow.addColorStop(0, `hsla(${hue - 12} 100% 88% / .35)`);
    glow.addColorStop(1, `hsla(${hue} 100% 80% / 0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, width, height);
    for (const [i, star] of stars.entries()) {
      const x = (((star.x + phase * star.speed * 0.08) % 1) + 1) % 1 * width;
      const y = (((star.y - phase * star.speed * 0.04) % 1) + 1) % 1 * height;
      const fade = Math.min(1, x / 55);
      const twinkle = 0.45 + Math.sin(phase * 2 + i * 1.9) * 0.25;
      ctx.fillStyle = `rgba(255,255,255,${fade * twinkle * (0.4 + ratio * 0.6)})`;
      ctx.beginPath();
      ctx.ellipse(x, y, star.size * (1 + ratio * 0.5), star.size * 0.65, -0.45, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    const shade = ctx.createLinearGradient(0, 0, Math.max(fill, 32), 0);
    shade.addColorStop(0, "rgba(36,39,44,.8)");
    shade.addColorStop(0.45, "rgba(36,39,44,0)");
    ctx.fillStyle = shade;
    ctx.fillRect(0, 0, width, height);
  };
  const observer = new ResizeObserver(() => {
    resize();
    draw(lastTime, true);
  });
  observer.observe(canvas);
  resize();
  return { draw, dispose: () => observer.disconnect() };
}

/* 滑块运动状态机：位置滑行、按压、速度果冻变形、星场加速。 */
function createEffortMotion(root, canvas, initialRatio, initialReducedMotion) {
  const state = { ratio: initialRatio, press: 1, body: 0, lean: 0, boost: 1 };
  let targetRatio = initialRatio;
  let reduced = initialReducedMotion;
  let attached = false;
  let disposed = false;
  let positionTween;
  let pressTween;
  let shapeTween;
  let boostTween;
  const field = createEffortField(canvas, () => state.ratio);
  const variables = () => ({
    "--effort-ratio": String(state.ratio),
    "--effort-press": String(state.press),
    "--effort-jelly-x": String(1 + state.body),
    "--effort-jelly-y": String(1 - state.body * 0.3),
    "--effort-jelly-offset": `${-state.lean * 9}px`,
    "--effort-jelly-skew": `${-state.lean * 12}deg`,
    "--effort-jelly-left": `${50 + state.lean * 32}%`,
    "--effort-jelly-right": `${50 - state.lean * 24}%`,
  });
  const paint = () => {
    if (disposed) return;
    for (const [name, value] of Object.entries(variables())) root.style.setProperty(name, value);
    if (reduced) field.draw(gsap.ticker.time, true);
  };
  const draw = (time) => {
    if (!document.hidden) field.draw(time, false, state.boost);
  };
  const syncTicker = () => {
    if (attached) gsap.ticker.remove(draw);
    attached = !reduced;
    field.draw(gsap.ticker.time, true);
    if (attached) gsap.ticker.add(draw);
  };
  const stopTweens = () => {
    positionTween?.kill();
    pressTween?.kill();
    shapeTween?.kill();
    boostTween?.kill();
  };
  syncTicker();
  paint();
  return {
    moveTo(ratio, immediate) {
      targetRatio = Math.max(0, Math.min(1, ratio));
      positionTween?.kill();
      positionTween = gsap.to(state, {
        ratio: targetRatio,
        duration: immediate || reduced ? 0 : 0.5,
        ease: glideEase,
        onUpdate: paint,
      });
    },
    press() {
      pressTween?.kill();
      pressTween = gsap.to(state, { press: reduced ? 1 : 0.96, duration: reduced ? 0 : 0.08, onUpdate: paint });
    },
    drag(velocity) {
      if (reduced || disposed) return;
      const speed = Math.min(3.5, Math.abs(velocity));
      const deformation = Math.min(0.46, 0.045 + speed * 0.17);
      const lean = Math.sign(velocity) * deformation;
      shapeTween?.kill();
      shapeTween = gsap.timeline({ onUpdate: paint })
        .to(state, { body: deformation, lean, duration: 0.09, ease: "power2.out" })
        .to(state, { body: 0, lean: 0, duration: 0.72, ease: returnEase }, ">0.07");
      boostTween?.kill();
      boostTween = gsap.to(state, { boost: 1 + Math.min(2.2, 0.55 + speed * 0.6), duration: 0.12, ease: "power2.out" });
    },
    release() {
      pressTween?.kill();
      shapeTween?.kill();
      boostTween?.kill();
      pressTween = gsap.to(state, { press: 1, duration: reduced ? 0 : 0.32, ease: "power2.out", onUpdate: paint });
      shapeTween = gsap.to(state, { body: 0, lean: 0, duration: reduced ? 0 : 0.72, ease: returnEase, onUpdate: paint });
      boostTween = gsap.to(state, { boost: 1, duration: reduced ? 0 : 0.7, ease: "power2.out" });
    },
    setReducedMotion(next) {
      if (next === reduced) return;
      reduced = next;
      stopTweens();
      Object.assign(state, { ratio: targetRatio, press: 1, body: 0, lean: 0, boost: 1 });
      paint();
      syncTicker();
    },
    dispose() {
      disposed = true;
      stopTweens();
      gsap.ticker.remove(draw);
      field.dispose();
    },
  };
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const el = (owner, tag, className, text) => {
  const node = owner.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const setHtml = (node, html) => {
  node.innerHTML = html;
  return node;
};

/* 思考强度滑块：菜单内嵌区块。独立组件版挂同样的核心。 */
function createEffortWidget(owner, { onChange, ariaLabel = "推理强度", reducedMotion }) {
  const root = el(owner, "div", "solen-effort");
  const track = el(owner, "button", "solen-effort-track");
  track.type = "button";
  track.setAttribute("role", "slider");
  track.setAttribute("aria-label", ariaLabel);
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", String(THINKING_STOPS.length - 1));
  const fill = setHtml(el(owner, "div", "solen-effort-fill"), "<canvas></canvas>");
  fill.setAttribute("aria-hidden", "true");
  const canvas = fill.firstChild;
  const dots = el(owner, "div", "solen-effort-dots");
  dots.setAttribute("aria-hidden", "true");
  for (let i = 0; i < THINKING_STOPS.length; i++) dots.append(owner.createElement("span"));
  const thumb = el(owner, "span", "solen-effort-thumb");
  thumb.setAttribute("aria-hidden", "true");
  track.append(fill, dots, thumb);
  const stopsRow = el(owner, "div", "solen-effort-stops");
  const stopButtons = THINKING_STOPS.map((stop) => {
    const button = el(owner, "button", "", stop.label);
    button.type = "button";
    button.setAttribute("aria-pressed", "false");
    stopsRow.append(button);
    return button;
  });
  root.append(track, stopsRow);

  let value = "medium";
  let preview = THINKING_STOPS.findIndex((stop) => stop.value === value);
  let dragging = false;
  let gesture = null;
  let disabled = false;
  let destroyed = false;

  const systemMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => reducedMotion ?? systemMedia.matches;
  const motion = createEffortMotion(root, canvas, preview / (THINKING_STOPS.length - 1), reduced());

  const paint = () => {
    const index = clamp(Math.round(preview), 0, THINKING_STOPS.length - 1);
    root.toggleAttribute("data-dragging", dragging);
    root.toggleAttribute("data-maximum", index === THINKING_STOPS.length - 1);
    root.toggleAttribute("data-disabled", disabled);
    track.setAttribute("aria-valuenow", String(index));
    track.setAttribute("aria-valuetext", THINKING_STOPS[index].label);
    track.setAttribute("aria-disabled", disabled ? "true" : "false");
    for (const [i, button] of stopButtons.entries()) button.setAttribute("aria-pressed", String(i === index));
  };
  const syncMotion = () => motion.moveTo(preview / (THINKING_STOPS.length - 1), dragging);
  const commit = (index) => {
    const next = clamp(Math.round(index), 0, THINKING_STOPS.length - 1);
    preview = next;
    paint();
    syncMotion();
    if (THINKING_STOPS[next].value !== value) {
      value = THINKING_STOPS[next].value;
      onChange?.(value);
    }
  };
  const cancel = () => {
    dragging = false;
    gesture = null;
    preview = THINKING_STOPS.findIndex((stop) => stop.value === value);
    paint();
    syncMotion();
    motion.release();
  };
  const ratioFromEvent = (event) => {
    const rect = track.getBoundingClientRect();
    if (rect.width <= 32) return 0;
    return clamp((event.clientX - rect.left - 16) / (rect.width - 32), 0, 1);
  };

  track.addEventListener("pointerdown", (event) => {
    if (disabled || destroyed) return;
    if (!event.isPrimary || event.button !== 0) {
      event.preventDefault();
      return;
    }
    track.setPointerCapture(event.pointerId);
    gesture = { id: event.pointerId, startX: event.clientX, lastX: event.clientX, time: event.timeStamp, moved: false };
    preview = ratioFromEvent(event) * (THINKING_STOPS.length - 1);
    dragging = false;
    paint();
    syncMotion();
    motion.press();
  });
  track.addEventListener("pointermove", (event) => {
    const current = gesture;
    if (!current || event.pointerId !== current.id || disabled) return;
    if (!current.moved && Math.abs(event.clientX - current.startX) < 4) return;
    current.moved = true;
    if (!dragging) {
      dragging = true;
      paint();
    }
    const velocity = (event.clientX - current.lastX) / Math.max(8, event.timeStamp - current.time);
    motion.drag(velocity);
    current.lastX = event.clientX;
    current.time = event.timeStamp;
    preview = ratioFromEvent(event) * (THINKING_STOPS.length - 1);
    paint();
    syncMotion();
  });
  const finishGesture = (event) => {
    if (!gesture || event.pointerId !== gesture.id) return;
    gesture = null;
    dragging = false;
    commit(preview);
    paint();
    motion.release();
  };
  track.addEventListener("pointerup", finishGesture);
  track.addEventListener("pointercancel", () => {
    if (gesture) cancel();
  });
  track.addEventListener("lostpointercapture", () => {
    if (gesture) cancel();
  });
  track.addEventListener("keydown", (event) => {
    if (disabled) return;
    const index = clamp(Math.round(preview), 0, THINKING_STOPS.length - 1);
    let next = index;
    if (["ArrowRight", "ArrowUp", "PageUp"].includes(event.key)) next = index + 1;
    else if (["ArrowLeft", "ArrowDown", "PageDown"].includes(event.key)) next = index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = THINKING_STOPS.length - 1;
    else return;
    event.preventDefault();
    event.stopPropagation();
    commit(next);
  });
  for (const [index, button] of stopButtons.entries()) {
    button.addEventListener("click", () => {
      if (!disabled && !destroyed) commit(index);
    });
  }
  paint();
  syncMotion();

  return {
    root,
    get value() {
      return value;
    },
    setValue(next, silent) {
      if (!THINKING_STOPS.some((stop) => stop.value === next) || next === value) return false;
      value = next;
      preview = THINKING_STOPS.findIndex((stop) => stop.value === value);
      paint();
      syncMotion();
      if (!silent) onChange?.(value);
      return true;
    },
    setDisabled(next) {
      disabled = Boolean(next);
      paint();
    },
    setReducedMotion(next) {
      motion.setReducedMotion(Boolean(next));
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      systemMedia.removeEventListener?.("change", () => {});
      motion.dispose();
    },
  };
}

export function mountAgentComposer(target, initial = {}) {
  const owner = target.ownerDocument;
  const browser = owner.defaultView;
  let options = { ...initial };
  let destroyed = false;

  /* ---- 挂载外壳 ---- */
  const element = owner.createElement("div");
  element.dataset.motionSurface = "";
  element.dataset.motionComponent = "agent-composer";
  element.style.cssText = "display:block;position:relative;min-width:0;width:100%;";
  for (const [name, token] of Object.entries(TOKENS)) element.style.setProperty(name, token);
  const shadow = element.attachShadow({ mode: "open" });
  const style = owner.createElement("style");
  style.textContent = CSS;
  shadow.append(style);
  target.append(element);

  const stage = el(owner, "div", "solen-stage");
  const composer = el(owner, "div", "solen-composer");
  stage.append(composer);
  shadow.append(stage);

  const systemMedia = browser.matchMedia("(prefers-reduced-motion: reduce)");
  const reduced = () => options.reducedMotion ?? systemMedia.matches;
  const dispatch = (name, detail) => element.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));

  /* ---- 状态 ---- */
  let models = Array.isArray(options.models) && options.models.length ? [...options.models] : [...DEFAULT_MODELS];
  let selectedModel = options.selectedModel && models.includes(options.selectedModel) ? options.selectedModel : models[0];
  let thinking = THINKING_STOPS.some((stop) => stop.value === options.value) ? options.value : "medium";
  let permission = "default";
  let text = "";
  let mentions = [];
  let attachments = [];
  let cursorPos = 0;
  let selectionRange = null;
  let editorFocused = false;
  let composing = false;
  let atOpen = false;
  let atSections = [];
  let atSelected = 0;
  let slashOpen = false;
  let slashEntries = [];
  let slashSelected = 0;
  let modelMenuOpen = false;
  let approvalMenuOpen = false;
  let contextOpen = false;

  /* ---- 提示浮层（单实例）---- */
  const tooltip = el(owner, "div", "solen-tooltip");
  let tooltipTimer = 0;
  let tooltipTarget = null;
  const showTooltip = (anchor, content) => {
    if (!content) return;
    tooltipTarget = anchor;
    tooltip.textContent = content;
    const stageRect = stage.getBoundingClientRect();
    const rect = anchor.getBoundingClientRect();
    tooltip.style.left = "0px";
    tooltip.style.top = "0px";
    tooltip.classList.add("solen-tooltip");
    const top = rect.top - stageRect.top - tooltip.offsetHeight - 8;
    const left = rect.left - stageRect.left + rect.width / 2 - tooltip.offsetWidth / 2;
    tooltip.style.left = `${clamp(left, 0, Math.max(0, stage.clientWidth - tooltip.offsetWidth))}px`;
    tooltip.style.top = `${Math.max(4, top)}px`;
    tooltip.setAttribute("data-show", "");
  };
  const hideTooltip = () => {
    tooltipTarget = null;
    tooltip.removeAttribute("data-show");
  };
  const bindTooltip = (node, getContent) => {
    node.addEventListener("pointerenter", () => {
      hideTooltip();
      tooltipTimer = browser.setTimeout(() => showTooltip(node, typeof getContent === "function" ? getContent() : getContent), 350);
    });
    node.addEventListener("pointerleave", () => {
      browser.clearTimeout(tooltipTimer);
      hideTooltip();
    });
    node.addEventListener("pointerdown", () => {
      browser.clearTimeout(tooltipTimer);
      hideTooltip();
    });
  };

  /* ---- 轻提示 ---- */
  const toastHost = el(owner, "div", "solen-toast-host");
  let toastSeq = 0;
  const toast = (type, message) => {
    const node = el(owner, "div", "solen-toast");
    node.dataset.type = type;
    node.setAttribute("role", "status");
    node.append(setHtml(el(owner, "span"), ICONS[type === "success" ? "circleCheck" : type === "info" ? "circleInfo" : "circleInfo"](14)));
    node.append(el(owner, "span", "", message));
    toastHost.append(node);
    gsap.fromTo(node, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: reduced() ? 0 : 0.24, ease: "power2.out" });
    const id = ++toastSeq;
    browser.setTimeout(() => {
      if (destroyed || !node.isConnected) return;
      gsap.to(node, { opacity: 0, duration: reduced() ? 0 : 0.2, onComplete: () => node.remove() });
    }, 3000);
  };

  /* ---- 建议面板（@ 与 /）---- */
  const suggestAt = el(owner, "div", "solen-suggest");
  suggestAt.setAttribute("role", "listbox");
  const suggestSlash = el(owner, "div", "solen-suggest");
  suggestSlash.setAttribute("role", "listbox");
  const renderSuggest = (panel, sections, selectedIndex, onPick, rowClass) => {
    panel.textContent = "";
    if (!sections.length) return;
    const scroll = el(owner, "div", "solen-suggest-scroll solen-scrollbar");
    let flat = 0;
    for (const section of sections) {
      const label = el(owner, "div", "solen-suggest-label", section.label);
      scroll.append(label);
      for (const item of section.items) {
        const index = flat;
        const row = el(owner, "div", rowClass);
        row.setAttribute("role", "option");
        row.setAttribute("aria-selected", String(index === selectedIndex));
        row.dataset.index = String(index);
        if (rowClass === "solen-suggest-row") {
          row.append(setHtml(el(owner, "span", "solen-suggest-icon"), ICONS[item.icon]?.(12) ?? ""));
          const body = el(owner, "span");
          body.style.minWidth = "0";
          body.append(el(owner, "span", "solen-suggest-title", item.title));
          if (item.desc) body.append(el(owner, "span", "solen-suggest-desc", item.desc));
          row.append(body);
        } else {
          row.append(el(owner, "span", "solen-slash-title", item.title));
          row.append(el(owner, "span", "solen-slash-desc", item.desc ?? ""));
          row.append(el(owner, "span", "solen-slash-cat", item.cat ?? ""));
        }
        row.addEventListener("click", () => onPick(item));
        row.addEventListener("pointerenter", () => highlightSuggestRow(panel, index));
        scroll.append(row);
        flat += 1;
      }
    }
    panel.append(scroll);
    panel.style.display = "block";
    selectSuggestRow(panel, selectedIndex);
  };
  const slidingPill = el(owner, "div");
  slidingPill.classList.add("solen-sliding-pill");
  const suggestPillIn = (panel) => {
    const scroll = panel.firstElementChild;
    let pill = panel.querySelector(".solen-sliding-pill");
    if (!pill) {
      pill = slidingPill;
      pill.style.left = "6px";
      pill.style.right = "6px";
      scroll.style.position = "relative";
      scroll.append(pill);
    }
    return { scroll, pill };
  };
  const selectSuggestRow = (panel, index) => {
    const rows = panel.querySelectorAll("[role='option']");
    const active = rows[index];
    if (!active) return;
    for (const row of rows) row.setAttribute("aria-selected", String(row === active));
    const { scroll, pill } = suggestPillIn(panel);
    pill.style.top = `${active.offsetTop}px`;
    pill.style.height = `${active.offsetHeight}px`;
    pill.setAttribute("data-ready", "");
    const bounds = scroll.getBoundingClientRect();
    const rowRect = active.getBoundingClientRect();
    if (rowRect.top < bounds.top) scroll.scrollTop -= bounds.top - rowRect.top;
    else if (rowRect.bottom > bounds.bottom) scroll.scrollTop += rowRect.bottom - bounds.bottom;
  };
  const highlightSuggestRow = (panel, index) => {
    if (panel === suggestAt) atSelected = index;
    else slashSelected = index;
    selectSuggestRow(panel, index);
  };
  const hideSuggest = (panel) => {
    panel.style.display = "none";
    panel.textContent = "";
  };

  /* ---- 附件区 ---- */
  const attachRow = el(owner, "div", "solen-attach-row");
  attachRow.setAttribute("aria-label", "附件");

  /* ---- 编辑器 ---- */
  const editor = el(owner, "div", "solen-editor");
  const mirror = el(owner, "div", "solen-mirror");
  mirror.setAttribute("aria-hidden", "true");
  const textarea = el(owner, "textarea", "solen-textarea solen-scrollbar");
  textarea.setAttribute("aria-label", "尽管问...");
  textarea.setAttribute("aria-autocomplete", "list");
  textarea.placeholder = "尽管问...";
  textarea.rows = 1;
  editor.append(mirror, textarea);

  /* ---- 工具栏 ---- */
  const toolbar = el(owner, "div", "solen-toolbar");
  const primaryTools = el(owner, "div", "solen-primary-tools");
  const modelTools = el(owner, "div", "solen-model-tools");
  toolbar.append(primaryTools, modelTools);

  const fileInput = el(owner, "input");
  fileInput.type = "file";
  fileInput.multiple = true;
  fileInput.style.display = "none";
  const attachButton = setHtml(el(owner, "button", "solen-icon-btn"), ICONS.plus(11));
  attachButton.type = "button";
  attachButton.setAttribute("aria-label", "添加文件");
  primaryTools.append(fileInput, attachButton);

  /* 权限菜单 */
  const approvalAnchor = el(owner, "div", "solen-anchor");
  const approvalShell = el(owner, "div", "solen-morph-shell");
  const approvalTrigger = el(owner, "button", "solen-perm-trigger");
  approvalTrigger.type = "button";
  approvalTrigger.setAttribute("aria-haspopup", "menu");
  approvalTrigger.setAttribute("aria-expanded", "false");
  const approvalPanel = el(owner, "div", "solen-menu-panel");
  approvalPanel.style.width = "min(288px, calc(100vw - 48px))";
  approvalPanel.setAttribute("role", "menu");
  const approvalInner = el(owner, "div", "solen-approval-panel");
  approvalPanel.append(approvalInner);
  approvalShell.append(approvalTrigger, approvalPanel);
  approvalAnchor.append(approvalShell);
  primaryTools.append(approvalAnchor);

  /* 模型菜单 + 上下文 + 发送 */
  const ringButton = el(owner, "button", "solen-ring-btn");
  ringButton.type = "button";
  ringButton.setAttribute("aria-label", "Context 0%");
  ringButton.append(setHtml(el(owner, "span", "solen-ring"),
    '<svg viewBox="0 0 40 40"><circle class="solen-ring-trail" cx="20" cy="20" r="15.5" fill="none" stroke-width="5" stroke-linecap="round"/><circle class="solen-ring-path" cx="20" cy="20" r="15.5" fill="none" stroke-width="5" stroke-linecap="round" transform="rotate(-90 20 20)"/></svg>'));
  const ringPath = ringButton.querySelector(".solen-ring-path");
  ringPath.style.stroke = "var(--theme-text-secondary)";
  const circumference = 2 * Math.PI * 15.5;
  for (const circle of ringButton.querySelectorAll("circle")) {
    circle.style.strokeDasharray = `${circumference}`;
    circle.style.strokeDashoffset = "0";
  }
  const contextPopover = el(owner, "div", "solen-popover");
  contextPopover.style.display = "none";

  const modelAnchor = el(owner, "div", "solen-anchor");
  const modelShell = el(owner, "div", "solen-morph-shell");
  const capsule = el(owner, "button", "solen-capsule");
  capsule.type = "button";
  capsule.setAttribute("aria-haspopup", "menu");
  capsule.setAttribute("aria-expanded", "false");
  const modelPanel = el(owner, "div", "solen-menu-panel");
  modelPanel.style.width = "264px";
  modelPanel.setAttribute("role", "menu");
  modelPanel.setAttribute("data-align", "right");
  const modelInner = el(owner, "div", "solen-menu-inner");
  modelPanel.append(modelInner);
  modelShell.append(capsule, modelPanel);
  modelAnchor.append(modelShell);

  const sendButton = el(owner, "button", "solen-send");
  sendButton.type = "button";
  sendButton.setAttribute("aria-label", "发送");
  modelTools.append(ringButton, modelAnchor, sendButton);
  composer.append(contextPopover);

  const card = el(owner, "div", "solen-card");
  const cardInner = el(owner, "div", "solen-card-inner");
  cardInner.append(suggestAt, suggestSlash, attachRow, editor, toolbar);
  card.append(cardInner);
  composer.append(card, toastHost, tooltip);

  /* ---- 思考滑块（模型菜单内）---- */
  const effort = createEffortWidget(owner, {
    ariaLabel: "推理强度",
    reducedMotion: options.reducedMotion,
    onChange: (next) => {
      thinking = next;
      options.onValueChange?.(next);
      dispatch("thinking-change", { value: next });
      paintCapsule();
    },
  });

  /* ---- 滑动选中底 ---- */
  const movePill = (list, pill, activeSelector) => {
    const active = list.querySelector(activeSelector);
    if (!active) {
      pill.removeAttribute("data-ready");
      return;
    }
    pill.style.top = `${active.offsetTop}px`;
    pill.style.height = `${active.offsetHeight}px`;
    pill.setAttribute("data-ready", "");
  };
  const bindSlidingList = (list, pill, activeValue, onPick) => {
    list.style.position = "relative";
    pill.style.left = "0";
    pill.style.right = "0";
    const movePillTo = (row) => {
      pill.style.top = `${row.offsetTop}px`;
      pill.style.height = `${row.offsetHeight}px`;
      pill.setAttribute("data-ready", "");
    };
    list.textContent = "";
    for (const option of PERMISSION_OPTIONS) {
      const row = el(owner, "div", "solen-approval-row");
      row.setAttribute("role", "menuitemradio");
      row.dataset.value = option.id;
      if (option.id === "full") row.setAttribute("data-full", "");
      row.setAttribute("aria-checked", String(option.id === activeValue));
      row.append(setHtml(el(owner, "span", "solen-approval-icon"), ICONS[option.icon](12)));
      const body = el(owner, "div");
      body.style.minWidth = "0";
      body.style.flex = "1";
      body.append(el(owner, "strong", "", option.label));
      body.append(el(owner, "small", "", option.desc));
      row.append(body);
      row.append(setHtml(el(owner, "span", "solen-menu-check"), ICONS.check(10)));
      row.addEventListener("click", () => onPick(option));
      row.addEventListener("pointerenter", () => movePillTo(row));
      list.append(row);
    }
    list.append(pill);
    list.addEventListener("pointerleave", () => {
      const active = list.querySelector('[aria-checked="true"]');
      if (active) movePillTo(active);
    });
    requestAnimationFrame(() => {
      const active = list.querySelector('[aria-checked="true"]');
      if (active) movePillTo(active);
    });
  };

  /* ---- 模型菜单内容 ---- */
  const modelSection = el(owner, "div", "solen-menu-pad");
  const modelTitle = el(owner, "div", "solen-menu-section");
  modelTitle.append(el(owner, "span", "", "模型"));
  const modelList = el(owner, "div", "solen-menu-list");
  modelList.setAttribute("role", "group");
  const modelPill = el(owner, "div", "solen-sliding-pill");
  modelSection.append(modelTitle, modelList);
  const divider = el(owner, "div", "solen-menu-divider");
  divider.setAttribute("role", "separator");
  const effortBlock = el(owner, "div", "solen-effort-block");
  const effortTitle = el(owner, "div", "solen-effort-title");
  effortTitle.append(el(owner, "span", "", "推理强度"));
  effortBlock.append(effortTitle, effort.root);
  modelInner.append(modelSection, divider, effortBlock);

  const renderModels = () => {
    modelList.textContent = "";
    if (!models.length) {
      modelList.append(el(owner, "div", "solen-menu-row", "暂无可用模型"));
      modelList.style.position = "static";
      return;
    }
    modelList.style.position = "relative";
    for (const id of models) {
      const row = el(owner, "div", "solen-menu-row");
      row.setAttribute("role", "menuitemradio");
      row.dataset.model = id;
      row.setAttribute("aria-checked", String(id === selectedModel));
      const name = el(owner, "strong", "", id);
      row.append(name);
      row.append(setHtml(el(owner, "span", "solen-menu-check"), ICONS.check(10)));
      row.addEventListener("click", () => chooseModel(id));
      row.addEventListener("pointerenter", () => {
        modelPill.style.top = `${row.offsetTop}px`;
        modelPill.style.height = `${row.offsetHeight}px`;
        modelPill.setAttribute("data-ready", "");
      });
      modelList.append(row);
    }
    modelList.append(modelPill);
    requestAnimationFrame(() => {
      const active = [...modelList.querySelectorAll(".solen-menu-row")].find((row) => row.dataset.model === selectedModel);
      if (active) {
        modelPill.style.top = `${active.offsetTop}px`;
        modelPill.style.height = `${active.offsetHeight}px`;
        modelPill.setAttribute("data-ready", "");
      }
    });
  };
  modelList.addEventListener("pointerleave", () => {
    const active = [...modelList.querySelectorAll(".solen-menu-row")].find((row) => row.dataset.model === selectedModel);
    if (active) {
      modelPill.style.top = `${active.offsetTop}px`;
      modelPill.style.height = `${active.offsetHeight}px`;
      modelPill.setAttribute("data-ready", "");
    }
  });

  /* ---- 变形菜单 ---- */
  const compactSize = (shell, trigger) => {
    const width = trigger.offsetWidth;
    const height = trigger.offsetHeight;
    const css = getComputedStyle(trigger);
    return {
      width,
      height,
      radius: Math.min(parseFloat(css.borderTopLeftRadius) || height / 2, height / 2),
      background: css.backgroundColor,
    };
  };
  const createMorphMenu = ({ shell, trigger, panel, align = "left", shadowCss = OPEN_SHADOW, onOpenChange }) => {
    let open = false;
    let present = false;
    let timeline;
    panel.inert = true;
    const setShell = (props) => gsap.set(shell, props);
    const place = () => {
      setShell({
        position: "absolute",
        [align === "left" ? "left" : "right"]: 0,
        [align === "left" ? "right" : "left"]: "auto",
        bottom: 0,
        top: "auto",
        maxWidth: "none",
      });
    };
    const restClosed = () => {
      gsap.set(trigger, { opacity: 1, scale: 1, clearProps: "position,left,right,top,bottom" });
      gsap.set(shell, {
        clearProps: "position,left,right,top,bottom,width,height,maxWidth,overflow,borderRadius,backgroundColor,boxShadow,transform",
      });
      shell.style.removeProperty("corner-shape");
      const anchor = shell.parentElement;
      anchor.style.width = "";
      anchor.style.height = "";
      panel.style.opacity = "0";
      panel.style.pointerEvents = "none";
    };
    const outside = (event) => {
      if (!open) return;
      const path = event.composedPath ? event.composedPath() : [];
      if (!path.includes(shell)) onOpenChange(false);
    };
    const escape = (event) => {
      if (open && event.key === "Escape") onOpenChange(false);
    };
    owner.addEventListener("mousedown", outside);
    owner.addEventListener("keydown", escape);
    /* 窗口尺寸变化后重新量一次，面板跟着视口重新钳位 */
    const retarget = () => {
      if (!open || !present) return;
      place();
      const expandedWidth = panel.offsetWidth;
      const expandedHeight = panel.offsetHeight;
      const anchorRect = shell.parentElement.getBoundingClientRect();
      const naturalLeft = align === "right" ? anchorRect.right - expandedWidth : anchorRect.left;
      const clampedLeft = Math.max(16, Math.min(naturalLeft, browser.innerWidth - expandedWidth - 16));
      gsap.set(shell, { width: expandedWidth, height: expandedHeight, x: clampedLeft - naturalLeft });
    };
    browser.addEventListener("resize", retarget);
    const setOpen = (next, first) => {
      if (next === open && !first) return;
      open = next;
      panel.inert = !open;
      trigger.setAttribute("aria-expanded", String(open));
      onOpenChange?.(open);
      const closed = compactSize(shell, trigger);
      timeline?.kill();
      if (!open && !present) {
        restClosed();
        return;
      }
      present = true;
      const anchorWidth = shell.parentElement.clientWidth;
      shell.parentElement.style.width = `${anchorWidth}px`;
      shell.parentElement.style.height = `${closed.height}px`;
      place();
      panel.style.width = `${panel.style.width}`;
      const expandedWidth = panel.offsetWidth;
      const expandedHeight = panel.offsetHeight;
      /* 面板在对齐侧生长，但整体钳进视口：窄屏时向内让位，不越出屏幕 */
      const anchorRect = shell.parentElement.getBoundingClientRect();
      const naturalLeft = align === "right" ? anchorRect.right - expandedWidth : anchorRect.left;
      const clampedLeft = Math.max(16, Math.min(naturalLeft, browser.innerWidth - expandedWidth - 16));
      const x = clampedLeft - naturalLeft;
      const play = () => {
        timeline = gsap.timeline({
          onComplete: () => {
            if (!destroyed && open) {
              shell.style.overflow = "visible";
              panel.style.pointerEvents = "auto";
            } else if (!destroyed && !open) {
              restClosed();
              present = false;
            }
          },
        });
        if (reduced() || first) {
          gsap.set(shell, {
            width: open ? expandedWidth : closed.width,
            height: open ? expandedHeight : closed.height,
            x: open ? x : 0,
            borderRadius: open ? 16 : closed.radius,
            backgroundColor: open ? "rgb(255 255 255)" : closed.background,
            boxShadow: open ? shadowCss : "0 0 0 rgba(0,0,0,0)",
          });
          if (open) shell.style.setProperty("corner-shape", "superellipse(1.6)");
          gsap.set(trigger, { opacity: open ? 0 : 1, scale: 1 });
          gsap.set(panel, { opacity: open ? 1 : 0, filter: "blur(0px)" });
          if (open) {
            shell.style.overflow = "visible";
            panel.style.pointerEvents = "auto";
          } else {
            restClosed();
            present = false;
          }
          return;
        }
        shell.style.overflow = "hidden";
        if (open) shell.style.setProperty("corner-shape", "superellipse(1.6)");
        const motionSet = open ? MORPH_MOTION.open : MORPH_MOTION.close;
        timeline.to(shell, {
          width: open ? expandedWidth : closed.width,
          duration: motionSet.width.duration,
          ease: springEase(motionSet.width.stiffness, motionSet.width.damping, motionSet.width.duration),
        }, motionSet.width.delay);
        timeline.to(shell, {
          height: open ? expandedHeight : closed.height,
          duration: motionSet.height.duration,
          ease: springEase(motionSet.height.stiffness, motionSet.height.damping, motionSet.height.duration),
        }, motionSet.height.delay);
        timeline.to(shell, {
          x: open ? x : 0,
          borderRadius: open ? 16 : closed.radius,
          backgroundColor: open ? "rgb(255 255 255)" : closed.background,
          boxShadow: open ? shadowCss : "0 0 0 rgba(0,0,0,0)",
          duration: 0.22,
          ease: "power2.out",
        }, 0);
        timeline.to(trigger, { opacity: open ? 0 : 1, duration: 0.14, ease: "power2.out" }, open ? 0 : 0.2);
        if (!open) timeline.fromTo(trigger, { scale: 0.95 }, { scale: 1, duration: 0.48, ease: springEase(300, 21, 0.48) }, 0.2);
        timeline.to(panel, {
          opacity: open ? 1 : 0,
          filter: open ? "blur(0px)" : "blur(5px)",
          duration: open ? 0.24 : 0.18,
          ease: "power2.out",
        }, open ? 0.12 : 0);
      };
      play();
    };
    return {
      get open() {
        return open;
      },
      setOpen,
      destroy() {
        owner.removeEventListener("mousedown", outside);
        owner.removeEventListener("keydown", escape);
        browser.removeEventListener("resize", retarget);
        timeline?.kill();
      },
    };
  };

  const approvalMenu = createMorphMenu({
    shell: approvalShell,
    trigger: approvalTrigger,
    panel: approvalPanel,
    align: "left",
    shadowCss: APPROVAL_SHADOW,
    onOpenChange: (next) => {
      approvalMenuOpen = next;
      if (next) {
        modelMenu.setOpen(false);
        setContextOpen(false);
      }
    },
  });
  const modelMenu = createMorphMenu({
    shell: modelShell,
    trigger: capsule,
    panel: modelPanel,
    align: "right",
    shadowCss: OPEN_SHADOW,
    onOpenChange: (next) => {
      modelMenuOpen = next;
      if (next) {
        approvalMenu.setOpen(false);
        setContextOpen(false);
      }
    },
  });

  /* ---- 权限 ---- */
  const paintPermission = () => {
    const option = PERMISSION_OPTIONS.find((item) => item.id === permission) ?? PERMISSION_OPTIONS[0];
    approvalTrigger.toggleAttribute("data-full", option.id === "full");
    approvalTrigger.textContent = "";
    approvalTrigger.append(setHtml(el(owner, "span", "solen-perm-icon"), ICONS[option.icon](12)));
    approvalTrigger.append(el(owner, "span", "solen-perm-label", option.label));
    approvalTrigger.append(setHtml(el(owner, "span", "solen-perm-chevron"), ICONS.chevronDown(10)));
    const pill = el(owner, "div", "solen-sliding-pill solen-approval-pill");
    if (option.id === "full") pill.setAttribute("data-full", "");
    bindSlidingList(approvalInner, pill, option.id, (picked) => {
      approvalMenu.setOpen(false);
      if (picked.id === permission) return;
      permission = picked.id;
      options.onPermissionChange?.(permission);
      dispatch("permission-change", { value: permission });
      paintPermission();
    });
  };
  approvalTrigger.addEventListener("click", () => {
    approvalMenu.setOpen(!approvalMenuOpen);
  });

  /* ---- 模型 ---- */
  const chooseModel = (id) => {
    if (id === selectedModel || !models.length) return;
    selectedModel = id;
    options.onModelChange?.(id);
    dispatch("model-change", { model: id });
    renderModels();
    paintCapsule();
    toast("success", `已切换模型：${id}`);
  };
  const paintCapsule = () => {
    const stop = THINKING_STOPS.find((item) => item.value === thinking) ?? THINKING_STOPS[1];
    capsule.textContent = "";
    capsule.append(setHtml(el(owner, "span", "solen-capsule-icon"), ICONS[THINKING_ICONS[stop.value]](12)));
    capsule.append(el(owner, "span", "solen-capsule-model", selectedModel ?? "选择模型"));
    capsule.append(el(owner, "span", "solen-capsule-thinking", stop.label));
    capsule.append(setHtml(el(owner, "span", "solen-capsule-chevron"), ICONS.chevronDown(10)));
  };
  capsule.addEventListener("click", () => {
    if (capsule.disabled) return;
    modelMenu.setOpen(!modelMenuOpen);
  });

  /* ---- 上下文浮层 ---- */
  const setContextOpen = (next) => {
    if (next === contextOpen) return;
    contextOpen = next;
    contextPopover.style.display = next ? "" : "none";
    if (next) {
      const rect = ringButton.getBoundingClientRect();
      const compRect = composer.getBoundingClientRect();
      contextPopover.style.left = `${clamp(rect.right - compRect.left - contextPopover.offsetWidth, 0, Math.max(0, compRect.width - contextPopover.offsetWidth))}px`;
      contextPopover.style.bottom = `${compRect.bottom - rect.top + 8}px`;
      gsap.fromTo(contextPopover, { opacity: 0, y: 5, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: reduced() ? 0 : 0.22, ease: "power2.out" });
    }
  };
  contextPopover.append(
    (() => {
      const head = el(owner, "div", "solen-popover-head");
      head.append(el(owner, "span", "", "预计下一次请求"));
      head.append(el(owner, "strong", "", "0%"));
      return head;
    })(),
    el(owner, "div", "solen-popover-sub", "0"),
  );
  ringButton.setAttribute("aria-label", "Context 0%");
  const contextOutside = (event) => {
    if (!contextOpen) return;
    const path = event.composedPath ? event.composedPath() : [];
    if (!path.includes(contextPopover) && !path.includes(ringButton)) setContextOpen(false);
  };
  owner.addEventListener("mousedown", contextOutside);
  ringButton.addEventListener("click", () => {
    if (contextOpen) setContextOpen(false);
    else {
      modelMenu.setOpen(false);
      approvalMenu.setOpen(false);
      setContextOpen(true);
    }
  });

  /* ---- 发送 ---- */
  const hasContent = () => Boolean(text.trim() || attachments.length || mentions.length);
  const paintSend = () => {
    const busy = Boolean(options.busy);
    const stopping = Boolean(options.stopping);
    const ready = busy ? Boolean(options.onStop) && !stopping : hasContent();
    sendButton.toggleAttribute("data-ready", ready);
    sendButton.toggleAttribute("data-spin", stopping);
    sendButton.disabled = busy ? !options.onStop || stopping : !hasContent();
    sendButton.setAttribute("aria-label", busy ? (stopping ? "正在停止…" : "停止") : "发送");
    sendButton.textContent = "";
    if (stopping) sendButton.append(setHtml(el(owner, "span"), ICONS.spinner(14)));
    else sendButton.append(setHtml(el(owner, "span"), busy ? ICONS.stop(11) : ICONS.arrowUp(11)));
    capsule.disabled = busy && !options.onStop;
  };
  const globalAbort = new AbortController();
  const pressRelease = (node) => {
    node.addEventListener("pointerdown", () => {
      if (node.disabled || reduced()) return;
      gsap.to(node, { scale: 0.97, duration: 0.075, ease: "power2.out" });
    });
    const release = () => gsap.to(node, { scale: 1, duration: reduced() ? 0 : 0.38, ease: springEase(420, 24, 0.38) });
    browser.addEventListener("pointerup", release, { passive: true, signal: globalAbort.signal });
    browser.addEventListener("pointercancel", release, { passive: true, signal: globalAbort.signal });
  };
  pressRelease(sendButton);
  pressRelease(attachButton);
  pressRelease(capsule);
  pressRelease(approvalTrigger);

  const submit = () => {
    const readyAttachments = attachments.filter((item) => item.status === "ready");
    const message = {
      text,
      model: selectedModel,
      thinking,
      attachments: readyAttachments.map(({ id, name, kind, status, dataUrl, extractedText }) => ({ id, name, kind, status, dataUrl, extractedText })),
      skills: [],
      mentions,
      permission,
    };
    options.onSubmit?.(message);
    dispatch("agent-submit", message);
    text = "";
    mentions = [];
    if (readyAttachments.length) attachments = [];
    cursorPos = 0;
    selectionRange = null;
    textarea.value = "";
    syncTextareaSize();
    renderAttachments();
    renderMirror();
    paintSend();
    textarea.focus();
  };
  sendButton.addEventListener("click", () => {
    if (options.busy) options.onStop?.();
    else if (hasContent()) submit();
  });

  /* ---- 附件 ---- */
  const renderAttachments = () => {
    attachRow.textContent = "";
    attachRow.style.display = attachments.length ? "flex" : "none";
    for (const item of attachments) {
      const failed = item.status === "error";
      if (item.kind === "image") {
        const wrap = el(owner, "div", "solen-attach-image");
        const statusText = failed ? "处理失败" : item.status === "processing" ? "识别中" : "";
        if (item.dataUrl) {
          const trigger = el(owner, "button", "solen-attach-image-trigger");
          trigger.type = "button";
          trigger.setAttribute("aria-label", `预览图片：${item.name}`);
          const img = el(owner, "img");
          img.src = item.dataUrl;
          img.alt = item.name;
          trigger.append(img);
          trigger.addEventListener("click", () => openPreview(item));
          wrap.append(trigger);
        } else {
          wrap.append(setHtml(el(owner, "div", "solen-attach-image-tile"), ICONS.image(20)));
        }
        if (statusText) {
          const status = el(owner, "span", "solen-attach-status", statusText);
          status.toggleAttribute("data-failed", failed);
          status.prepend(setHtml(el(owner, "span"), (failed ? ICONS.circleInfo : ICONS.spinner)(12)));
          wrap.append(status);
        }
        const remove = setHtml(el(owner, "button", "solen-attach-remove"), ICONS.x(10));
        remove.type = "button";
        remove.setAttribute("aria-label", `移除图片：${item.name}`);
        remove.addEventListener("click", () => removeAttachment(item.id));
        wrap.append(remove);
        bindTooltip(wrap, failed ? `${item.name}：处理失败` : item.name);
        attachRow.append(wrap);
      } else {
        const chipEl = el(owner, "div", "solen-attach-file");
        chipEl.append(setHtml(el(owner, "div", "solen-attach-file-tile"), ICONS[item.kind === "text" ? "fileLines" : "file"](16)));
        const body = el(owner, "div");
        body.style.minWidth = "0";
        body.style.flex = "1";
        body.append(el(owner, "div", "solen-attach-file-name", item.name));
        const statusText = item.status === "processing" ? "处理中" : failed ? "处理失败" : item.kind === "text" ? "文本" : "文件";
        body.append(el(owner, "div", "solen-attach-file-status", statusText));
        chipEl.append(body);
        const remove = setHtml(el(owner, "button", "solen-attach-remove"), ICONS.x(11));
        remove.type = "button";
        remove.setAttribute("aria-label", `移除附件：${item.name}`);
        remove.addEventListener("click", () => removeAttachment(item.id));
        chipEl.append(remove);
        attachRow.append(chipEl);
        bindTooltip(chipEl, `${item.name}：${statusText}`);
      }
    }
    attachButton.disabled = attachments.length >= MAX_ATTACHMENTS;
  };
  const removeAttachment = (id) => {
    attachments = attachments.filter((item) => item.id !== id);
    renderAttachments();
    paintSend();
  };
  const markAttachment = (id, patch) => {
    attachments = attachments.map((item) => (item.id === id ? { ...item, ...patch } : item));
    renderAttachments();
  };
  const readFile = (file, mode) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result ?? ""));
      reader.onerror = () => reject(reader.error ?? new Error("读取文件失败"));
      reader[mode](file);
    });
  const addFiles = async (files) => {
    const incoming = Array.from(files);
    const remaining = MAX_ATTACHMENTS - attachments.length;
    if (incoming.length > remaining) toast("warning", `最多可添加 ${MAX_ATTACHMENTS} 个附件`);
    for (const file of incoming.slice(0, Math.max(0, remaining))) {
      const id = `att-${++toastSeq}`;
      if (file.type.startsWith("image/")) {
        attachments = [...attachments, { id, kind: "image", name: file.name, status: "processing" }];
        renderAttachments();
        try {
          const dataUrl = await readFile(file, "readAsDataURL");
          markAttachment(id, { status: "ready", dataUrl });
        } catch {
          markAttachment(id, { status: "error" });
        }
      } else {
        attachments = [...attachments, { id, kind: "text", name: file.name, status: "processing" }];
        renderAttachments();
        try {
          const content = await readFile(file, "readAsText");
          markAttachment(id, { status: "ready", extractedText: content });
        } catch {
          markAttachment(id, { status: "error" });
        }
      }
    }
    paintSend();
  };
  fileInput.addEventListener("change", () => {
    if (fileInput.files?.length) void addFiles(fileInput.files);
    fileInput.value = "";
  });
  attachButton.addEventListener("click", () => {
    if (attachments.length < MAX_ATTACHMENTS) fileInput.click();
  });

  /* ---- 图片预览 ---- */
  let previewNode = null;
  const closePreview = () => {
    if (!previewNode) return;
    const node = previewNode;
    previewNode = null;
    gsap.to(node, {
      opacity: 0,
      duration: reduced() ? 0 : 0.18,
      ease: "power2.in",
      onComplete: () => node.remove(),
    });
  };
  const openPreview = (item) => {
    if (previewNode) return;
    const modal = el(owner, "div", "solen-modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-label", `预览图片：${item.name}`);
    const backdrop = el(owner, "div", "solen-modal-backdrop");
    backdrop.addEventListener("mousedown", closePreview);
    const img = el(owner, "img", "solen-modal-img");
    img.src = item.dataUrl;
    img.alt = item.name;
    const close = setHtml(el(owner, "button", "solen-modal-close"), ICONS.x(20));
    close.type = "button";
    close.setAttribute("aria-label", "关闭图片预览");
    close.addEventListener("click", closePreview);
    modal.append(backdrop, img, close);
    modal.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closePreview();
    });
    stage.append(modal);
    previewNode = modal;
    gsap.fromTo(modal, { opacity: 0 }, { opacity: 1, duration: reduced() ? 0 : 0.22, ease: "power2.out" });
    gsap.fromTo(img, { scale: 0.96 }, { scale: 1, duration: reduced() ? 0 : 0.32, ease: "power3.out" });
    close.focus();
  };

  /* ---- 编辑器逻辑 ---- */
  const findActiveAtToken = (value, cursor) => {
    const before = value.slice(0, cursor);
    const match = before.match(/(^|\s)@([^\s]*)$/);
    if (!match || match.index === undefined) return null;
    const start = match.index + match[1].length;
    const full = value.slice(start + 1).match(/^[^\s]*/)?.[0] ?? "";
    if (cursor > start + 1 + full.length) return null;
    return { start, end: start + 1 + full.length, query: full };
  };
  const findSlashCommand = (value) => {
    if (!value.startsWith("/")) return null;
    const body = value.slice(1);
    const space = body.search(/\s/);
    const name = space >= 0 ? body.slice(0, space) : body;
    const argQuery = space >= 0 ? body.slice(space + 1).trim().toLowerCase() : "";
    return { name: name.toLowerCase(), argQuery, hasSpace: space >= 0 };
  };

  const buildAtSections = (query) => {
    const matches = (candidate) => !query || candidate.toLowerCase().includes(query);
    const sections = [];
    const addItems = [
      { id: "add-files", type: "add-files", title: "文件和文件夹", desc: query ? "继续输入以搜索项目文件和文件夹" : "", icon: "paperclip" },
      { id: "goal", type: "goal", title: "目标", desc: "设置要持续追求的目标", icon: "bullseye" },
      { id: "plan-mode", type: "plan-mode", title: "计划模式", desc: "开启计划模式", icon: "listCheck" },
    ].filter((item) => matches(item.title) || matches(item.desc));
    if (addItems.length) sections.push({ label: "添加", items: addItems });
    if (!query) {
      sections.push({ label: "文件和任务", items: [{ id: "files-hint", type: "files-hint", title: "输入以搜索文件或任务", desc: "", icon: "paperclip" }] });
    }
    return sections;
  };
  const buildSlashEntries = (command) => {
    if (!command) return [];
    if (command.name === "model" && (command.hasSpace || !command.argQuery)) {
      return models
        .filter((id) => !command.hasSpace || id.toLowerCase().includes(command.argQuery))
        .map((id) => ({ id: `model.${id}`, title: id, desc: id === selectedModel ? "当前模型" : "切换到这个模型", cat: "模型", insert: `/model ${id} ` }));
    }
    if (command.name === "thinking" && (command.hasSpace || !command.argQuery)) {
      const options = [
        { id: "simple", title: "simple", desc: "简单思考，响应更快", cat: "思考" },
        { id: "medium", title: "medium", desc: "中度思考，默认平衡模式", cat: "思考" },
        { id: "deep", title: "deep", desc: "深度思考，给复杂任务更多推理预留", cat: "思考" },
      ];
      return options
        .filter((opt) => !command.hasSpace || opt.title.includes(command.argQuery))
        .map((opt) => ({ id: `thinking.${opt.id}`, ...opt, insert: `/thinking ${opt.id} ` }));
    }
    return [];
  };

  const chooseAt = (choice) => {
    const token = findActiveAtToken(text, cursorPos);
    if (!token) return;
    if (choice.type === "add-files" || choice.type === "files-hint") {
      toast("info", "继续在 @ 后输入文件名或文件夹名即可搜索");
      return;
    }
    if (choice.type === "goal") {
      const goal = browser.prompt?.("请输入要持续追踪的目标");
      if (!goal || !goal.trim()) return;
      insertMention(token, { kind: "goal", text: goal.trim() });
    } else if (choice.type === "plan-mode") {
      if (!mentions.some((mention) => mention.kind === "plan_mode")) insertMention(token, { kind: "plan_mode" });
    }
    atSections = [];
    atOpen = false;
    hideSuggest(suggestAt);
  };
  const insertMention = (token, mention) => {
    const prefix = text.slice(0, token.start);
    const suffix = text.slice(token.end);
    const spacer = suffix && !/^\s/.test(suffix) ? " " : "";
    text = `${prefix}${MENTION_MARKER}${spacer}${suffix}`;
    const insertAt = (prefix.match(new RegExp(MENTION_MARKER, "g")) ?? []).length;
    mentions = [...mentions.slice(0, insertAt), mention, ...mentions.slice(insertAt)];
    cursorPos = token.start + 1 + spacer.length;
    selectionRange = null;
    textarea.value = text;
    syncTextareaSize();
    renderMirror();
    paintSend();
    requestAnimationFrame(() => {
      textarea.setSelectionRange(cursorPos, cursorPos);
      textarea.focus();
    });
  };
  const chooseSlash = (entry) => {
    text = entry.insert;
    cursorPos = entry.insert.length;
    textarea.value = text;
    syncTextareaSize();
    renderMirror();
    slashEntries = [];
    slashOpen = false;
    hideSuggest(suggestSlash);
    requestAnimationFrame(() => {
      textarea.setSelectionRange(cursorPos, cursorPos);
      textarea.focus();
    });
    paintSend();
  };

  const renderMirrorCaret = (fragment) => {
    const caret = el(owner, "span", "solen-caret");
    fragment.append(caret);
  };
  const renderMirror = () => {
    mirror.textContent = "";
    if (!text) {
      mirror.append(el(owner, "span", "solen-placeholder", "尽管问..."));
      return;
    }
    const fragment = owner.createDocumentFragment();
    const marker = MENTION_MARKER;
    let offset = 0;
    let mentionIndex = 0;
    let match;
    const markerRegex = new RegExp(marker, "g");
    const appendText = (raw, start) => {
      if (!raw) return;
      const caretHere = editorFocused && cursorPos >= start && cursorPos <= start + raw.length;
      if (selectionRange && start < selectionRange.end && start + raw.length > selectionRange.start) {
        const selStart = Math.max(selectionRange.start, start) - start;
        const selEnd = Math.min(selectionRange.end, start + raw.length) - start;
        if (selStart > 0) fragment.append(owner.createTextNode(raw.slice(0, selStart)));
        fragment.append(el(owner, "span", "solen-seltext", raw.slice(selStart, selEnd)));
        if (selEnd < raw.length) fragment.append(owner.createTextNode(raw.slice(selEnd)));
      } else if (caretHere) {
        const caretIndex = cursorPos - start;
        if (caretIndex > 0) fragment.append(owner.createTextNode(raw.slice(0, caretIndex)));
        renderMirrorCaret(fragment);
        if (caretIndex < raw.length) fragment.append(owner.createTextNode(raw.slice(caretIndex)));
      } else {
        fragment.append(owner.createTextNode(raw));
      }
    };
    while ((match = markerRegex.exec(text)) !== null) {
      appendText(text.slice(offset, match.index), offset);
      offset = match.index;
      const mention = mentions[mentionIndex];
      if (mention) {
        const iconKey = mention.kind === "plan_mode" ? "listCheck" : "bullseye";
        const label = mention.kind === "plan_mode" ? "计划模式" : "目标";
        const chip = el(owner, "span", "solen-chip");
        chip.dataset.kind = "mention";
        const selected = selectionRange && selectionRange.start <= offset && offset + 1 <= selectionRange.end;
        if (selected) chip.setAttribute("data-selected", "");
        chip.append(setHtml(el(owner, "span"), ICONS[iconKey](11)));
        chip.append(el(owner, "span", "", label));
        bindTooltip(chip, mention.kind === "goal" ? mention.text : "开启计划模式");
        fragment.append(chip);
      }
      mentionIndex += 1;
      offset += 1;
      if (editorFocused && cursorPos === offset) renderMirrorCaret(fragment);
    }
    appendText(text.slice(offset), offset);
    mirror.append(fragment);
  };
  const syncCursor = () => {
    cursorPos = textarea.selectionStart ?? 0;
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    selectionRange = start === end ? null : { start: Math.min(start, end), end: Math.max(start, end) };
    renderMirror();
  };
  const syncTextareaSize = () => {
    textarea.style.height = "auto";
    const next = Math.min(Math.max(textarea.scrollHeight, TEXTAREA_MIN_HEIGHT), TEXTAREA_MAX_HEIGHT);
    textarea.style.height = `${next}px`;
    textarea.style.overflowY = textarea.scrollHeight > TEXTAREA_MAX_HEIGHT ? "auto" : "hidden";
    if (!text) textarea.toggleAttribute("data-empty", true);
    else textarea.removeAttribute("data-empty");
  };

  const syncSuggestions = () => {
    const atToken = findActiveAtToken(text, cursorPos);
    const command = findSlashCommand(text);
    if (atToken && !command) {
      atSections = buildAtSections(atToken.query.trim().toLowerCase());
      atOpen = atSections.length > 0;
      atSelected = clamp(atSelected, 0, atSections.reduce((sum, section) => sum + section.items.length, 0) - 1);
      if (atOpen) {
        suggestAt.style.display = "";
        renderSuggest(suggestAt, atSections, atSelected, chooseAt, "solen-suggest-row");
      } else hideSuggest(suggestAt);
    } else {
      atSections = [];
      atOpen = false;
      hideSuggest(suggestAt);
    }
    if (command) {
      slashEntries = buildSlashEntries(command);
      slashOpen = slashEntries.length > 0;
      slashSelected = clamp(slashSelected, 0, slashEntries.length - 1);
      if (slashOpen) {
        suggestSlash.style.display = "";
        renderSuggest(suggestSlash, [{ label: "模型与思考", items: slashEntries }], slashSelected, chooseSlash, "solen-slash-row");
      } else hideSuggest(suggestSlash);
    } else {
      slashEntries = [];
      slashOpen = false;
      hideSuggest(suggestSlash);
    }
    const listId = atOpen ? "solen-suggest-at" : slashOpen ? "solen-suggest-slash" : "";
    if (atOpen) suggestAt.id = "solen-suggest-at";
    if (slashOpen) suggestSlash.id = "solen-suggest-slash";
    if (listId) textarea.setAttribute("aria-controls", listId);
    else textarea.removeAttribute("aria-controls");
  };

  textarea.addEventListener("compositionstart", () => {
    composing = true;
  });
  textarea.addEventListener("compositionend", () => {
    composing = false;
    text = textarea.value;
    syncTextareaSize();
    renderMirror();
    paintSend();
    syncSuggestions();
  });
  textarea.addEventListener("input", () => {
    text = textarea.value;
    cursorPos = textarea.selectionStart ?? text.length;
    syncTextareaSize();
    renderMirror();
    paintSend();
    if (!composing) syncSuggestions();
  });
  textarea.addEventListener("keydown", (event) => {
    if (composing) return;
    const atCount = atSections.reduce((sum, section) => sum + section.items.length, 0);
    if (atOpen && event.key === "ArrowDown") {
      event.preventDefault();
      atSelected = Math.min(atSelected + 1, atCount - 1);
      selectSuggestRow(suggestAt, atSelected);
      return;
    }
    if (atOpen && event.key === "ArrowUp") {
      event.preventDefault();
      atSelected = Math.max(atSelected - 1, 0);
      selectSuggestRow(suggestAt, atSelected);
      return;
    }
    if (atOpen && (event.key === "Tab" || (event.key === "Enter" && !event.shiftKey))) {
      const flat = atSections.flatMap((section) => section.items)[atSelected];
      if (flat) {
        event.preventDefault();
        chooseAt(flat);
        return;
      }
    }
    if (atOpen && event.key === "Escape") {
      event.preventDefault();
      atOpen = false;
      hideSuggest(suggestAt);
      return;
    }
    if (slashOpen && event.key === "ArrowDown") {
      event.preventDefault();
      slashSelected = Math.min(slashSelected + 1, slashEntries.length - 1);
      selectSuggestRow(suggestSlash, slashSelected);
      return;
    }
    if (slashOpen && event.key === "ArrowUp") {
      event.preventDefault();
      slashSelected = Math.max(slashSelected - 1, 0);
      selectSuggestRow(suggestSlash, slashSelected);
      return;
    }
    if (slashOpen && (event.key === "Tab" || (event.key === "Enter" && !event.shiftKey))) {
      const selected = slashEntries[slashSelected];
      if (selected && selected.title !== text.trim()) {
        event.preventDefault();
        chooseSlash(selected);
        return;
      }
    }
    if (slashOpen && event.key === "Escape") {
      event.preventDefault();
      slashOpen = false;
      hideSuggest(suggestSlash);
      return;
    }
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!options.busy && hasContent()) submit();
    }
  });
  const handleCopyCut = (event, isCut) => {
    const start = textarea.selectionStart ?? 0;
    const end = textarea.selectionEnd ?? start;
    if (start === end) return;
    const selected = textarea.value.slice(start, end).split(MENTION_MARKER).join("");
    event.preventDefault();
    event.clipboardData?.setData("text/plain", selected);
    if (!isCut) return;
    const removed = (textarea.value.slice(start, end).match(new RegExp(MENTION_MARKER, "g")) ?? []).length;
    const nextValue = `${textarea.value.slice(0, start)}${textarea.value.slice(end)}`;
    if (removed > 0) {
      const removeAt = (textarea.value.slice(0, start).match(new RegExp(MENTION_MARKER, "g")) ?? []).length;
      mentions = [...mentions.slice(0, removeAt), ...mentions.slice(removeAt + removed)];
    }
    text = nextValue;
    cursorPos = start;
    selectionRange = null;
    textarea.value = text;
    syncTextareaSize();
    renderMirror();
    paintSend();
    requestAnimationFrame(() => {
      textarea.setSelectionRange(start, start);
      textarea.focus();
    });
  };
  textarea.addEventListener("copy", (event) => handleCopyCut(event, false));
  textarea.addEventListener("cut", (event) => handleCopyCut(event, true));
  textarea.addEventListener("paste", (event) => {
    const files = Array.from(event.clipboardData?.files ?? []);
    if (files.length) {
      event.preventDefault();
      void addFiles(files);
    }
  });
  textarea.addEventListener("select", syncCursor);
  textarea.addEventListener("click", syncCursor);
  textarea.addEventListener("keyup", syncCursor);
  textarea.addEventListener("focus", () => {
    editorFocused = true;
    syncCursor();
  });
  textarea.addEventListener("blur", () => {
    editorFocused = false;
    selectionRange = null;
    renderMirror();
  });
  textarea.addEventListener("scroll", () => {
    mirror.scrollTop = textarea.scrollTop;
    mirror.scrollLeft = textarea.scrollLeft;
  });
  card.addEventListener("dragover", (event) => event.preventDefault());
  card.addEventListener("drop", (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files ?? []);
    if (files.length) void addFiles(files);
  });

  /* ---- 工具提示绑定 ---- */
  bindTooltip(attachButton, attachments.length >= MAX_ATTACHMENTS ? `最多可添加 ${MAX_ATTACHMENTS} 个附件` : "添加文件");
  bindTooltip(capsule, () => `选择模型 / ${THINKING_STOPS.find((stop) => stop.value === thinking)?.label ?? ""}`);
  bindTooltip(sendButton, () => (options.busy ? (options.stopping ? "正在停止…" : "停止") : null));
  bindTooltip(ringButton, "Context 0%");

  /* ---- 画布 ---- */
  const applyHeight = () => {
    element.style.setProperty("--motion-height", `${options.height ?? 600}px`);
  };
  const applyDisabled = () => {
    element.inert = Boolean(options.disabled);
  };
  const syncMedia = () => {
    effort.setReducedMotion(reduced());
  };
  systemMedia.addEventListener("change", syncMedia);

  applyHeight();
  applyDisabled();
  renderModels();
  paintCapsule();
  paintPermission();
  paintSend();
  renderAttachments();
  renderMirror();
  syncTextareaSize();
  effort.setValue(thinking, true);

  return {
    element,
    root: shadow,
    update(next = {}) {
      if (destroyed) return;
      options = { ...options, ...next };
      if (Array.isArray(next.models)) {
        models = [...next.models];
        if (!models.includes(selectedModel)) selectedModel = models[0] ?? "";
        renderModels();
        paintCapsule();
      }
      if (typeof next.selectedModel === "string" && models.includes(next.selectedModel) && next.selectedModel !== selectedModel) {
        selectedModel = next.selectedModel;
        renderModels();
        paintCapsule();
      }
      if (typeof next.value === "string" && effort.setValue(next.value, true)) {
        thinking = next.value;
        paintCapsule();
      }
      if (next.busy !== undefined || next.stopping !== undefined || next.onStop !== undefined) paintSend();
      if (next.disabled !== undefined) applyDisabled();
      if (next.height !== undefined) applyHeight();
      if (next.reducedMotion !== undefined) syncMedia();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      systemMedia.removeEventListener("change", syncMedia);
      globalAbort.abort();
      approvalMenu.destroy();
      modelMenu.destroy();
      effort.destroy();
      owner.removeEventListener("mousedown", contextOutside);
      browser.clearTimeout(tooltipTimer);
      previewNode?.remove();
      element.remove();
    },
  };
}
