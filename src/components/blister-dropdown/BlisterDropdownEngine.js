// src/lib/motion-core/blister-dropdown.mjs
import { createSurface } from "./motion-runtime";
var values = ["all", "open", "closed"];
var defaultCounts = { all: 7, open: 4, closed: 3 };
var accents = { all: "#1a56ff", open: "#eba428", closed: "#769a66" };
var clamp = (n, min, max) => Math.min(max, Math.max(min, n));
var back = (t) => 1 + 2.70158 * (t - 1) ** 3 + 1.70158 * (t - 1) ** 2;
var cubic = (t) => t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2;
var pocket = (value, cavity = false) => `<span class="blister-pocket" aria-hidden="true">
  <span class="blister-rim"></span><span class="blister-pill" data-value="${value}"></span>
  <span class="blister-dome"></span>${cavity ? '<span class="blister-cavity"></span>' : ""}
</span>`;
var markup = (chevron2) => `<div class="blister-stage">
  <div class="blister-assembly">
    <button type="button" class="blister-trigger blister-foil" aria-haspopup="listbox" aria-controls="blister-options" aria-expanded="true">
      ${pocket("all")}<span class="blister-label" data-current>show all</span>
      ${chevron2}
    </button>
    <div class="blister-clip">
      <div id="blister-options" class="blister-panel blister-foil" role="listbox" aria-label="Status">
        ${values.map((value) => `<div class="blister-row" role="option" data-value="${value}" aria-selected="${value === "all"}" tabindex="-1">
          ${pocket(value, true)}<span class="blister-selection blister-label">${value}</span><span class="blister-count"></span>
        </div>`).join("")}
      </div>
    </div>
  </div>
  <span class="blister-pill blister-flight" aria-hidden="true" hidden></span>
</div>`;
function createBlisterDropdown(host, initial, css2, chevron2, preview = false) {
  const scope = createSurface(host, { width: 560, height: 448, css: css2, markup: markup(chevron2) }, initial);
  const { root, on, reduced, rect, setTimeout, clearTimeout } = scope;
  const doc = host.ownerDocument;
  const browser = doc.defaultView;
  const stage = root.querySelector(".blister-stage");
  const assembly = root.querySelector(".blister-assembly");
  const trigger = root.querySelector(".blister-trigger");
  const panel = root.querySelector(".blister-panel");
  const socket = trigger.querySelector(".blister-pocket");
  const headerPill = trigger.querySelector(".blister-pill");
  const label = root.querySelector("[data-current]");
  const flightPill = root.querySelector(".blister-flight");
  const rows = [...panel.querySelectorAll(".blister-row")];
  const animations = /* @__PURE__ */ new Set();
  let options = { expanded: true, autoClose: true, sound: true, ...initial };
  let value = values.includes(options.value) ? options.value : "all";
  let expanded = Boolean(options.expanded);
  let audio, flight, closeTimer;
  if (preview) stage.dataset.preview = "";
  function animate(node, keyframes, timing) {
    const action = node.animate(keyframes, timing);
    animations.add(action);
    void action.finished.then(() => animations.delete(action), () => animations.delete(action));
    return action;
  }
  function playTone(kind, trusted) {
    if (!trusted || !options.sound || !browser.AudioContext) return;
    try {
      audio ?? (audio = new browser.AudioContext());
      if (audio.state === "suspended") void audio.resume().catch(() => {
      });
      const time = audio.currentTime;
      const tone = audio.createOscillator();
      const volume = audio.createGain();
      const pop = kind === "pop";
      tone.type = kind === "land" ? "sine" : "triangle";
      tone.frequency.setValueAtTime(pop ? 425 : kind === "land" ? 180 : expanded ? 190 : 245, time);
      tone.frequency.exponentialRampToValueAtTime(pop ? 78 : expanded ? 290 : 140, time + 0.045);
      volume.gain.setValueAtTime(1e-4, time);
      volume.gain.exponentialRampToValueAtTime(pop ? 0.2 : 0.072, time + 5e-3);
      volume.gain.exponentialRampToValueAtTime(1e-4, time + 0.06);
      tone.connect(volume).connect(audio.destination);
      tone.onended = () => {
        tone.disconnect();
        volume.disconnect();
      };
      tone.start(time);
      tone.stop(time + 0.065);
      if (!pop) return;
      const noise = audio.createBufferSource();
      noise.buffer = audio.createBuffer(1, Math.ceil(audio.sampleRate * 0.09), audio.sampleRate);
      const samples = noise.buffer.getChannelData(0);
      for (let i = 0; i < samples.length; i++) samples[i] = (Math.random() * 2 - 1) * (1 - i / samples.length) ** 1.6;
      const band = audio.createBiquadFilter();
      band.type = "bandpass";
      band.frequency.value = 3800;
      band.Q.value = 1.8;
      const level = audio.createGain();
      level.gain.value = 0.15;
      noise.connect(band).connect(level).connect(audio.destination);
      noise.onended = () => {
        noise.disconnect();
        band.disconnect();
        level.disconnect();
      };
      noise.start(time + 6e-3);
    } catch {
    }
  }
  function paintRows() {
    rows.forEach((row) => {
      const key = row.dataset.value;
      row.setAttribute("aria-selected", String(key === value));
      row.tabIndex = expanded && key === value ? 0 : -1;
      const count = options.counts?.[key] ?? defaultCounts[key];
      row.querySelector(".blister-count").textContent = String(count);
    });
  }
  function paintHeader() {
    headerPill.dataset.value = value;
    headerPill.style.visibility = "";
    label.textContent = `show ${value}`;
    trigger.setAttribute("aria-label", `Show ${value}`);
  }
  function cancelClose() {
    if (closeTimer !== void 0) clearTimeout(closeTimer);
    closeTimer = void 0;
  }
  function settleFlight() {
    if (flight) flight.cancel();
    flight = void 0;
    flightPill.hidden = true;
    paintHeader();
  }
  function setExpanded(next, trusted = false, animateRows = true) {
    cancelClose();
    if (!next && panel.contains(root.activeElement)) trigger.focus();
    if (!next && flight) settleFlight();
    expanded = next;
    trigger.setAttribute("aria-expanded", String(expanded));
    panel.inert = !expanded;
    paintRows();
    if (expanded && animateRows && !reduced()) {
      rows.forEach((row, index) => {
        if (row.dataset.value === value) return;
        animate(row.querySelector(".blister-pill"), [
          { transform: "translateY(-5px) scale(.82)" },
          { transform: "translateY(1px) scale(1.06)", offset: 0.65 },
          { transform: "none" }
        ], { duration: 380, delay: index * 45, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      });
    }
    if (animateRows) playTone("slide", trusted);
  }
  function burst(origin) {
    const group = doc.createElement("span");
    group.className = "blister-burst";
    group.setAttribute("aria-hidden", "true");
    group.style.left = `${origin.left + origin.width / 2}px`;
    group.style.top = `${origin.top + origin.height / 2}px`;
    group.style.setProperty("--burst-color", accents[value]);
    stage.append(group);
    const ring = doc.createElement("span");
    ring.className = "blister-ring";
    group.append(ring);
    const effects = [animate(
      ring,
      [{ opacity: 0.7, transform: "scale(.8)" }, { opacity: 0, transform: "scale(3.7)" }],
      { duration: 280, easing: "ease-out", fill: "forwards" }
    )];
    for (let i = 0; i < 14; i++) {
      const flake = doc.createElement("span");
      const angle = i / 14 * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const distance = 22 + Math.random() * 32;
      const x = Math.cos(angle) * distance, y = Math.sin(angle) * distance;
      flake.style.width = `${3 + i % 4}px`;
      flake.style.height = `${1.5 + i % 3}px`;
      group.append(flake);
      effects.push(animate(flake, [
        { opacity: 0.92, transform: `translate(${x * 0.16}px,${y * 0.12}px) rotate(${i * 26}deg)` },
        { opacity: 0.48, transform: `translate(${x * 0.66}px,${y * 0.72 - 10}px) rotate(${i * 34 + 45}deg)`, offset: 0.56 },
        { opacity: 0, transform: `translate(${x}px,${y + 13}px) rotate(${i * 40 + 95}deg)` }
      ], { duration: 290 + i % 4 * 32, fill: "forwards" }));
    }
    void Promise.allSettled(effects.map((effect) => effect.finished)).then(() => group.remove());
  }
  function select(row, trusted) {
    if (!expanded) return;
    cancelClose();
    settleFlight();
    const next = row.dataset.value;
    const changed = next !== value;
    const from = rect(row.querySelector(".blister-pocket"));
    const to = rect(socket);
    value = next;
    paintRows();
    playTone("pop", trusted);
    if (reduced() || doc.hidden) {
      paintHeader();
      if (options.autoClose) setExpanded(false, false, false);
      if (changed) options.onValueChange?.(value);
      return;
    }
    burst(from);
    animate(row.querySelector(".blister-cavity"), [
      { transform: "scale(.84)", filter: "brightness(1.35)" },
      { transform: "scale(1.05)", filter: "brightness(.92)", offset: 0.45 },
      { transform: "none", filter: "none" }
    ], { duration: 260, easing: "cubic-bezier(.22,1,.36,1)" });
    headerPill.style.visibility = "hidden";
    flightPill.dataset.value = value;
    flightPill.hidden = false;
    const halfWidth = flightPill.offsetWidth / 2, halfHeight = flightPill.offsetHeight / 2;
    const x0 = from.left + from.width / 2 - halfWidth, y0 = from.top + from.height / 2 - halfHeight;
    const x1 = to.left + to.width / 2 - halfWidth, y1 = to.top + to.height / 2 - halfHeight;
    const frames = Array.from({ length: 23 }, (_, i) => {
      const t = i / 22;
      const pop = t <= 0.36;
      const p = pop ? back(t / 0.36) : cubic((t - 0.36) / 0.64);
      const arc = pop ? 0 : Math.sin(Math.PI * p);
      const x = pop ? x0 : x0 + (x1 - x0) * p - 6 * arc;
      const y = pop ? y0 - 12 * p : y0 - 12 + (y1 - y0 + 12) * p;
      const scale = pop ? 1 + 0.36 * p : 1.36 - 0.36 * p + 0.08 * arc;
      const tilt = -5.5 * (pop ? p : 1 - p);
      return { transform: `translate3d(${x}px,${y}px,0) rotate(${tilt}deg) scale(${scale})` };
    });
    const currentFlight = flight = animate(flightPill, frames, { duration: 430, fill: "forwards" });
    void currentFlight.finished.then(() => {
      if (flight !== currentFlight) return;
      settleFlight();
      animate(headerPill, [
        { transform: "translateY(-3px) scale(1.24)" },
        { transform: "translateY(1px) scale(.92)", offset: 0.55 },
        { transform: "none" }
      ], { duration: 340, easing: "cubic-bezier(.22,1,.36,1)" });
      animate(label, [{ opacity: 0.15, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 160 });
      playTone("land", trusted);
      if (options.autoClose && expanded) closeTimer = setTimeout(() => setExpanded(false, trusted), 160);
    }, () => {
    });
    if (changed) options.onValueChange?.(value);
  }
  on(trigger, "click", (event) => setExpanded(!expanded, event.isTrusted));
  on(trigger, "keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "Escape"].includes(event.key)) return;
    event.preventDefault();
    if (event.key === "Escape") {
      if (expanded) setExpanded(false, event.isTrusted);
      return;
    }
    if (!expanded) setExpanded(true, event.isTrusted);
    rows[event.key === "ArrowDown" ? 0 : rows.length - 1].focus();
  });
  rows.forEach((row, index) => {
    on(row, "click", (event) => select(row, event.isTrusted));
    on(row, "keydown", (event) => {
      const { key, isTrusted } = event;
      if (!["Enter", " ", "Escape", "ArrowUp", "ArrowDown", "Home", "End"].includes(key)) return;
      event.preventDefault();
      if (key === "Enter" || key === " ") {
        select(row, isTrusted);
        return;
      }
      if (key === "Escape") {
        setExpanded(false, isTrusted);
        return;
      }
      const next = key === "Home" ? 0 : key === "End" ? rows.length - 1 : (index + (key === "ArrowDown" ? 1 : -1) + rows.length) % rows.length;
      rows[next].focus();
    });
  });
  on(assembly, "pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const bounds = assembly.getBoundingClientRect();
    assembly.style.setProperty("--sheen-x", `${clamp((event.clientX - bounds.left) / bounds.width * 100, -20, 120)}%`);
    assembly.style.setProperty("--sheen-y", `${clamp((event.clientY - bounds.top) / bounds.height * 100, -20, 120)}%`);
  });
  on(doc, "pointerdown", (event) => {
    if (expanded && !event.composedPath().includes(assembly)) setExpanded(false, false);
  });
  on(doc, "visibilitychange", () => {
    if (doc.hidden) settleFlight();
  });
  scope.addCleanup(() => {
    animations.forEach((action) => action.cancel());
    if (audio) void audio.close().catch(() => {
    });
  });
  paintHeader();
  setExpanded(expanded, false, false);
  return {
    ...scope.controller,
    update(next) {
      options = { ...options, ...next };
      scope.controller.update(next);
      if (values.includes(next.value) && next.value !== value) {
        value = next.value;
        cancelClose();
        settleFlight();
      }
      if (typeof next.expanded === "boolean" && next.expanded !== expanded) setExpanded(next.expanded, false, false);
      else paintRows();
      if (!options.autoClose) cancelClose();
      if (reduced() && flight) settleFlight();
    }
  };
}

// src/lib/motion-core/blister-dropdown-entry.js

var css = `.blister-stage {
  position: relative;
  display: grid;
  min-height: var(--motion-height, 448px);
  place-items: center;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 40%, #242831 0, #101115 53%, #08080a 100%);
  color: #25282c;
  user-select: none;
}

.blister-stage[data-preview] { background: #f4f4f4; }
.blister-stage [hidden] { display: none !important; }
.blister-assembly {
  position: relative;
  width: 396px;
  height: 391px;
  font: 500 19px/1.15 "IBM Plex Mono", "Cascadia Mono", ui-monospace, Menlo, Consolas, monospace;
  letter-spacing: -.045em;
  --sheen-x: 38%;
  --sheen-y: 28%;
}

.blister-foil {
  border: 1px solid #ffffff69;
  border-radius: 13px;
  background:
    radial-gradient(320px circle at var(--sheen-x) var(--sheen-y), #ffffff85 0, #ffffff24 38%, transparent 72%),
    repeating-linear-gradient(45deg, #ffffff3b 0 1px, transparent 1px 3.5px),
    repeating-linear-gradient(-45deg, #373c461f 0 1px, transparent 1px 3.5px),
    repeating-linear-gradient(0deg, #ffffff25 0, #0000000a 1px, #ffffff1c 2px),
    linear-gradient(165deg, #eceef1, #d8dade 36%, #c5c9d0 74%, #d4d7dc);
  box-shadow: inset 0 1.5px 1px #ffffffe8, inset 1px 0 1px #ffffffa6,
    inset 0 -2px 3px #484c568c, inset -1px 0 2px #52566061,
    0 20px 42px -8px #000a, 0 6px 16px #0007;
}

.blister-trigger {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 112px 1fr 28px;
  align-items: center;
  gap: 12px;
  width: 356px;
  height: 84px;
  margin: 0 auto;
  padding: 0 18px;
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
  text-align: left;
  cursor: pointer;
  transition: transform 180ms cubic-bezier(.22,1,.36,1);
}

.blister-trigger:active { transform: translateY(1px) scale(.993); }
.blister-trigger:focus-visible { outline: 2px solid #4675ff; outline-offset: 4px; }
.blister-chevron { width: 16px; height: 16px; justify-self: center; transition: transform 360ms cubic-bezier(.22,1,.36,1); }
.blister-trigger[aria-expanded=false] .blister-chevron { transform: rotate(180deg); }
.blister-label { text-shadow: 0 1px #fffa; }

.blister-clip {
  position: absolute;
  top: 82px;
  width: 100%;
  overflow: hidden;
  padding: 10px 20px 44px;
  pointer-events: none;
}

.blister-panel {
  overflow: hidden;
  pointer-events: auto;
  transition: transform 460ms cubic-bezier(.22,1.06,.36,1), opacity 320ms cubic-bezier(.22,1,.36,1);
}

.blister-panel[inert] { transform: translateY(calc(-100% - 18px)); opacity: 0; pointer-events: none; }
.blister-row {
  display: grid;
  grid-template-columns: 112px auto 1fr;
  gap: 12px;
  align-items: center;
  height: 88px;
  padding: 0 26px 0 18px;
  cursor: pointer;
  outline-offset: -3px;
}

.blister-row:hover { background: #ffffff25; }
.blister-row:active { background: #0000000d; }
.blister-row:focus-visible { outline: 2px solid #194cef; }
.blister-row + .blister-row { border-top: 2px dotted #54596488; }
.blister-count { justify-self: end; color: #333840; text-shadow: 0 1px #fffa; }
.blister-selection { display: flex; align-items: center; }
.blister-selection::before {
  content: "";
  width: 0;
  height: 8.5px;
  border-radius: 50%;
  opacity: 0;
  background: radial-gradient(circle at 35% 35%, #5986ff, #1a56ff 55%, #1036ac);
  box-shadow: 0 0 8px #1a56ff85, 0 1px #fffb;
  transition: width 220ms, margin-right 220ms, opacity 160ms;
}

.blister-row[aria-selected=true] .blister-selection::before { width: 8.5px; margin-right: 10px; opacity: 1; }
.blister-pocket {
  position: relative;
  display: grid;
  place-items: center;
  width: 112px;
  height: 64px;
  isolation: isolate;
  pointer-events: none;
}

.blister-rim {
  position: absolute;
  inset: 2px 3px;
  border-radius: 999px;
  background: linear-gradient(162deg, #fbfcff9c 2%, #73798677 24%, #f4f5f852 49%, #4c525e54 66%, #fff 96%);
  box-shadow: 0 2px 3px #0004, inset 0 0 0 1px #fafcffbe, inset 0 0 0 3px #8288958c,
    inset 0 0 0 5px #e9edf29c, inset 0 1px 8px #333946c4;
}

.blister-rim::after {
  position: absolute;
  inset: 9px;
  content: "";
  border-radius: inherit;
  background: #b8bbc65c;
  box-shadow: inset 0 2px 4px #34384255, inset 0 -1px 1px #fff;
}

.blister-dome {
  position: absolute;
  z-index: 2;
  inset: 7px 11px;
  border-radius: 999px;
  background: linear-gradient(145deg, #fff5, #fff1 32%, transparent 56%, #fff2);
  box-shadow: inset 0 1px 1.5px #fff9;
  pointer-events: none;
}

.blister-pill {
  position: relative;
  width: 81px;
  height: 33px;
  border-radius: 999px;
  background: linear-gradient(90deg, #0645c5 0 49%, #e8e8e8 50%);
  box-shadow: 0 3px 5px #11182266, inset 0 1px 1px #0006;
}

.blister-pill::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(180deg, #0007, transparent 33%, #fff5 68%, #0004);
  box-shadow: inset 0 -1px 1px #0005;
}

.blister-pill[data-value=all]::before {
  content: "";
  position: absolute;
  inset: 4px 50% 5px 5px;
  border: 2px solid #6099fc55;
  border-right: 0;
  border-radius: 999px 0 0 999px;
}

.blister-pill[data-value=open] {
  width: 84px;
  height: 35px;
  background: radial-gradient(ellipse at 46% 51%, #63320c 0 25%, #ac570c 40%, transparent 65%),
    linear-gradient(156deg, #783a09 12%, #ffa226 28%, #d07516 44%, #4c200a 68%, #ffc25b 83%, #7e4109 94%);
  box-shadow: 0 3px 5px #1d0c0160, inset 0 0 0 1px #6d300a, inset 0 0 6px #ee9f40;
}

.blister-pill[data-value=open]::after {
  inset: 5px 11px;
  background: linear-gradient(178deg, #ffe6ad 0, transparent 25%, #3313058c 53%, #ffd486 92%);
  box-shadow: -8px 5px 0 -4px #fff5dc, inset 0 0 1px #fff3cf;
}

.blister-pill[data-value=closed] {
  width: 82px;
  background: linear-gradient(90deg, #778b70 0 51%, #58674f 52%, #83927a 55%, #65785e 96%);
  box-shadow: 0 3px 5px #111d1477, inset 0 1px 1px #252c226e;
}

.blister-pill[data-value=closed]::after {
  background: radial-gradient(ellipse at 23% 74%, #e6ebd48c, transparent 45%),
    linear-gradient(180deg, #222c21a8, transparent 32%, #ced4be5c 70%, #303c2e70);
}

.blister-cavity {
  position: absolute;
  inset: 2px 3px;
  display: none;
  border-radius: 999px;
  background: conic-gradient(from 12deg, #f5f5f5, #666970 10%, #e4e6e8 17%, #b8bbc2 29%, #f5f5f5 37%,
    #484b50 48%, #d6d8db 59%, #878b91 66%, #f6f6f6 78%, #4a4c50 89%, #efeff0);
  box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 3px #7a7d82, inset 0 0 0 5px #e4e6ea, 0 3px 5px #0005;
}

.blister-cavity::before,
.blister-cavity::after { content: ""; position: absolute; }
.blister-cavity::before {
  inset: 7px 9px;
  clip-path: polygon(0 34%, 9% 10%, 25% 18%, 38% 0, 52% 14%, 72% 0, 89% 15%, 100% 36%, 97% 77%, 87% 95%, 69% 86%, 56% 100%, 38% 82%, 24% 92%, 20% 64%, 4% 63%);
  background: repeating-linear-gradient(4deg, #ffffff10 0 1px, transparent 1px 3px),
    radial-gradient(ellipse at 50% 78%, #4d4f51, #252729 62%, #111214 83%);
  box-shadow: inset 0 4px 12px #000;
}

.blister-cavity::after {
  width: 37%;
  height: 61%;
  left: 8%;
  bottom: 9%;
  clip-path: polygon(0 3%, 38% 14%, 52% 30%, 85% 42%, 74% 64%, 99% 90%, 51% 100%, 11% 75%);
  background: conic-gradient(from 31deg at 46% 49%, #fffb, #8c8f95, #fff, #53565e, #f9fafc, #bcbec3, #fffb);
}

.blister-row[aria-selected=true] .blister-cavity { display: block; }
.blister-row[aria-selected=true] :is(.blister-rim, .blister-dome, .blister-pill) { visibility: hidden; }
.blister-stage > .blister-flight {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 4;
  pointer-events: none;
}

.blister-burst { position: absolute; z-index: 3; pointer-events: none; }
.blister-burst > span { position: absolute; background: #f4f6f9; box-shadow: 0 0 1px #51535f; }
.blister-burst > .blister-ring {
  width: 28px;
  height: 16px;
  margin: -8px -14px;
  background: transparent;
  border: 1px solid var(--burst-color);
  border-radius: 50%;
}
`;
var chevron = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up blister-chevron" aria-hidden="true"><path d="m18 15-6-6-6 6"></path></svg>';
function mountBlisterDropdown(host, options = {}) {
  return createBlisterDropdown(host, options, css, chevron);
}
export {
  mountBlisterDropdown
};
