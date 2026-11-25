// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";
export function mountBrandLineCards(target, options = {}) {
const scope = createSurface(target, {"markup":"\r\n  <main class=\"gallery\" aria-label=\"Interactive brand signals\">\r\n    <h1 class=\"visually-hidden\">Brand signals, drawn with vertical lines</h1>\r\n    <article class=\"card apple\" data-brand=\"apple\" tabindex=\"0\" aria-labelledby=\"apple-name\" aria-describedby=\"interaction-help\">\r\n      <canvas class=\"art\" aria-hidden=\"true\"></canvas>\r\n      <header class=\"brand\"><svg class=\"mark\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path></path></svg><h2 id=\"apple-name\">Apple</h2></header>\r\n      <div class=\"caption\">\r\n        <p class=\"tagline\">Designed with<br>restraint. Every pixel<br>has to earn its place.</p>\r\n        <button class=\"source\" type=\"button\" aria-haspopup=\"dialog\" aria-label=\"Reveal the Apple source\">Reveal the source <span aria-hidden=\"true\">→</span></button>\r\n      </div>\r\n    </article>\r\n    <article class=\"card google\" data-brand=\"google\" tabindex=\"0\" aria-labelledby=\"google-name\" aria-describedby=\"interaction-help\">\r\n      <canvas class=\"art\" aria-hidden=\"true\"></canvas>\r\n      <header class=\"brand\"><svg class=\"mark\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path></path></svg><h2 id=\"google-name\">Google</h2></header>\r\n      <div class=\"caption\">\r\n        <p class=\"tagline\">Organizing the<br>world’s information,<br>one signal at a time.</p>\r\n        <button class=\"source\" type=\"button\" aria-haspopup=\"dialog\" aria-label=\"Reveal the Google source\">Reveal the source <span aria-hidden=\"true\">→</span></button>\r\n      </div>\r\n    </article>\r\n    <article class=\"card tesla\" data-brand=\"tesla\" tabindex=\"0\" aria-labelledby=\"tesla-name\" aria-describedby=\"interaction-help\">\r\n      <canvas class=\"art\" aria-hidden=\"true\"></canvas>\r\n      <header class=\"brand\"><svg class=\"mark\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path></path></svg><h2 id=\"tesla-name\">Tesla</h2></header>\r\n      <div class=\"caption\">\r\n        <p class=\"tagline\">Accelerating the<br>world’s transition to<br>sustainable energy.</p>\r\n        <button class=\"source\" type=\"button\" aria-haspopup=\"dialog\" aria-label=\"Reveal the Tesla source\">Reveal the source <span aria-hidden=\"true\">→</span></button>\r\n      </div>\r\n    </article>\r\n  </main>\r\n  <p class=\"visually-hidden\" id=\"interaction-help\">Move your pointer across the card to scatter its lines. Detection boxes change their positions, sizes and connections as you move. On a touch screen, tap the artwork. Keyboard focus also reveals the detection boxes.</p>\r\n  <dialog aria-labelledby=\"source-title\" id=\"source-dialog\">\r\n    <div class=\"dialog-head\"><h2 class=\"dialog-title\" id=\"source-title\"></h2><button class=\"close\" type=\"button\" aria-label=\"Close source\">Close ×</button></div>\r\n    <p class=\"explanation\">One SVG path, sampled once into a brightness grid. The large logo is a field of vertical lines; the small header mark uses the original vector path. Four stroke widths, a drifting noise field, and a spring at each joint bring the signal to life.</p>\r\n    <div class=\"code-label\">01 / EMBEDDED SVG PATH · VIEWBOX 0 0 24 24</div>\r\n    <pre id=\"path-source\"></pre>\r\n    <div class=\"code-label\">02 / THE RENDERING PIPELINE</div>\r\n    <pre>SVG path → offscreen canvas → averaged luminance grid\r\n                         ↓ discard offscreen canvas\r\ngrid + flowing noise → 4 stroke widths → spring displacement\r\n                         ↓\r\n                  Canvas 2D · requestAnimationFrame</pre>\r\n    <div class=\"dialog-bottom\"><button class=\"copy\" type=\"button\">Copy SVG path</button><span role=\"status\" id=\"copy-status\" aria-live=\"polite\">No images. No libraries. Just lines.</span></div>\r\n  </dialog>\r\n  \r\n","css":"\r\n    :root { font-family: Arial, Helvetica, sans-serif; color: #171717; background: #fff; }\r\n    * { box-sizing: border-box; }\r\n    body { margin: 0; min-width: 280px; }\r\n    button { font: inherit; }\r\n    .gallery {\r\n      width: min(1280px, 87%); min-height: 100svh; margin: auto;\r\n      display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));\r\n      gap: 16px; align-content: center; padding: 56px 0;\r\n    }\r\n    .card {\r\n      position: relative; isolation: isolate; overflow: hidden; aspect-ratio: 3 / 4;\r\n      container-type: inline-size; cursor: default; outline-offset: 5px;\r\n      --ink: #171717; --focus: #0069df; color: var(--ink);\r\n    }\r\n    .apple { background: linear-gradient(180deg, #f5f5f3, #e6e6e4); }\r\n    .google { --ink: #f5f8ff; --focus: #c9efff; background: linear-gradient(180deg, #0b164f 0%, #193b9f 52%, #2c62f5 100%); }\r\n    .tesla { --ink: #f6f3f3; --focus: #6dc8ff; background: linear-gradient(180deg, #111112, #190f12); }\r\n    .art { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -2; }\r\n    .card::after {\r\n      content: \"\"; position: absolute; z-index: -1; inset: 0; pointer-events: none;\r\n      background: linear-gradient(180deg, transparent 50%, var(--scrim) 77%, transparent 100%);\r\n    }\r\n    .apple { --scrim: #e9e9e78c; }\r\n    .google { --scrim: #2454d359; }\r\n    .tesla { --scrim: #170f12a6; }\r\n    .brand { position: absolute; left: 11.5%; top: 9%; display: flex; align-items: center; gap: 9px; }\r\n    .mark { width: 23px; height: 25px; fill: currentColor; flex: none; }\r\n    h2 { margin: 0; font-size: clamp(17px, 5.2cqi, 24px); font-weight: 600; letter-spacing: -.045em; }\r\n    .caption { position: absolute; left: 11.5%; right: 8%; bottom: 9.5%; }\r\n    .tagline { margin: 0 0 25px; font-size: clamp(19px, 6.35cqi, 29px); line-height: 1.32; font-weight: 400; letter-spacing: -.045em; }\r\n    .source {\r\n      color: inherit; border: 0; padding: 7px 0; margin: -7px 0;\r\n      background: transparent; cursor: pointer; font-size: clamp(12px, 3.65cqi, 15px);\r\n      line-height: 1.4; letter-spacing: -.025em; text-align: left;\r\n      text-decoration-thickness: 1px; text-underline-offset: 5px;\r\n    }\r\n    .source span { margin-left: 9px; }\r\n    .source:hover { text-decoration: underline; }\r\n    .card:focus-visible, .source:focus-visible { outline: 2px solid var(--focus); }\r\n    .source:focus-visible { outline-offset: 6px; }\r\n    dialog {\r\n      width: min(740px, calc(100% - 32px)); max-height: calc(100svh - 40px);\r\n      padding: 32px; border: 1px solid #333; color: #eee; background: #131518;\r\n    }\r\n    dialog::backdrop { background: #0009; backdrop-filter: blur(5px); }\r\n    .dialog-head { display: flex; align-items: center; justify-content: space-between; gap: 20px; }\r\n    .dialog-title { font-size: 24px; letter-spacing: -.04em; font-weight: 500; margin: 0; }\r\n    .close, .copy { border: 1px solid #555; color: #eee; background: transparent; padding: 9px 13px; cursor: pointer; }\r\n    .close:hover, .copy:hover { background: #292d34; }\r\n    dialog button:focus-visible { outline: 2px solid #7ac6ff; outline-offset: 4px; }\r\n    .explanation { font-size: 14px; line-height: 1.7; color: #bdc2cb; margin: 24px 0 18px; }\r\n    .code-label { color: #9bcfff; font: 11px/1.6 Consolas, monospace; letter-spacing: .05em; }\r\n    pre { margin: 9px 0 23px; padding: 16px; border: 1px solid #343840; background: #0c0e10; white-space: pre-wrap; overflow-wrap: anywhere; font: 12px/1.7 Consolas, monospace; color: #d6dde7; }\r\n    .dialog-bottom { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; font-size: 12px; color: #b9c0ca; }\r\n    .visually-hidden { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }\r\n    @media (min-width: 601px) and (max-width: 900px) {\r\n      .gallery { width: 94%; gap: 12px; }\r\n      .brand { gap: 6px; }\r\n      .mark { width: 18px; height: 21px; }\r\n      .tagline { font-size: clamp(16px, 6.1cqi, 23px); margin-bottom: 18px; }\r\n    }\r\n    @media (max-width: 600px) {\r\n      .gallery { width: calc(100% - 40px); grid-template-columns: 1fr; gap: 20px; padding: 24px 0; }\r\n      .card { aspect-ratio: 3 / 4; }\r\n      .tagline { font-size: 6.35cqi; }\r\n      dialog { padding: 22px; }\r\n    }\r\n    @media (prefers-reduced-motion: reduce) { dialog::backdrop { backdrop-filter: none; } }\r\n  ","width":1200,"height":720,"responsive":true}, options);
const { document, window, requestAnimationFrame, cancelAnimationFrame, setTimeout, clearTimeout, setInterval, clearInterval, ResizeObserver, IntersectionObserver, matchMedia } = scope;

    'use strict';
    // Embedded brand-mark path data (public-domain icon set).
    // Brand names and marks belong to their respective owners.
    (() => {
      const BRANDS = {
        apple: {
          name: 'Apple', ink: '30,30,29', detector: '#168ce9', labelInk: '#fff', seed: 11,
          pose: { x: -.025, y: -.012, size: 1.07 },
          path: 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701'
        },
        google: {
          name: 'Google', ink: '175,206,255', detector: '#ffda27', labelInk: '#182143', seed: 29,
          pose: { x: -.025, y: .035, size: 1.06 },
          path: 'M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
        },
        tesla: {
          name: 'Tesla', ink: '244,57,74', detector: '#f1efea', labelInk: '#181315', seed: 47,
          pose: { x: -.02, y: .055, size: 1.04 },
          path: 'M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.034c-3.18 0-4.188.354-4.335 1.792 0 0-2.146-.795-3.229-2.43C5.28 2.431 9.525 2.34 9.525 2.34L12 5.362l-.004.002H12v-.002zm0-3.899c3.415-.03 7.326.528 11.328 2.28.535-.968.672-1.395.672-1.395C19.625.612 15.528.015 12 0 8.472.015 4.375.61 0 2.349c0 0 .195.525.672 1.396C4.674 1.989 8.585 1.435 12 1.46v.003z'
        }
      };
      const GRID = 96, OVERSAMPLE = 4, COLS = 58, ROWS = 132;
      // Exactly FOUR stroke widths; no continuously interpolated thickness.
      const WIDTHS = [.34, .85, 1.65, 2.7];
      const ALPHAS = [.014, .23, .43, .65];
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
      const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
      const smooth = n => n * n * (3 - 2 * n);

      // 1. Render the SVG ONCE, average every 4×4 pixel cell into a typed array.
      // This function returns numbers only: neither the canvas nor its context
      // or pixel buffer is retained. Animation never calls getImageData again.
      function makeBrightnessTable(path) {
        const offscreen = document.createElement('canvas');
        offscreen.width = offscreen.height = GRID * OVERSAMPLE;
        const ctx = offscreen.getContext('2d', { willReadFrequently: true });
        ctx.fillStyle = '#000'; ctx.fillRect(0, 0, offscreen.width, offscreen.height);
        ctx.scale(offscreen.width / 24, offscreen.height / 24);
        ctx.fillStyle = '#fff'; ctx.fill(new Path2D(path));
        const pixels = ctx.getImageData(0, 0, offscreen.width, offscreen.height).data;
        const values = new Float32Array(GRID * GRID);
        for (let gy = 0; gy < GRID; gy++) {
          for (let gx = 0; gx < GRID; gx++) {
            let total = 0;
            for (let sy = 0; sy < OVERSAMPLE; sy++) {
              for (let sx = 0; sx < OVERSAMPLE; sx++) {
                const i = ((gy * OVERSAMPLE + sy) * offscreen.width + gx * OVERSAMPLE + sx) * 4;
                total += .2126 * pixels[i] + .7152 * pixels[i + 1] + .0722 * pixels[i + 2];
              }
            }
            values[gy * GRID + gx] = total / (OVERSAMPLE * OVERSAMPLE * 255);
          }
        }
        offscreen.width = offscreen.height = 0; // Release backing storage now.
        return values;
      }

      function sample(table, u, v) {
        if (u < 0 || u > 1 || v < 0 || v > 1) return 0;
        const x = u * (GRID - 1), y = v * (GRID - 1);
        const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
        const x1 = Math.min(ix + 1, GRID - 1), y1 = Math.min(iy + 1, GRID - 1);
        const a = table[iy * GRID + ix] * (1 - fx) + table[iy * GRID + x1] * fx;
        const b = table[y1 * GRID + ix] * (1 - fx) + table[y1 * GRID + x1] * fx;
        return a * (1 - fy) + b * fy;
      }

      // Seeded, smoothly interpolated value noise; its y coordinate advances
      // upward through the table, so the visible noise travels DOWN the card.
      function noiseField(seed) {
        const field = new Float32Array(64 * 64);
        let s = seed;
        for (let i = 0; i < field.length; i++) {
          s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
          field[i] = s / 4294967296;
        }
        return (x, y) => {
          const ix = Math.floor(x), iy = Math.floor(y);
          const fx = smooth(x - ix), fy = smooth(y - iy);
          const at = (a, b) => field[(b & 63) * 64 + (a & 63)];
          return (at(ix, iy) * (1 - fx) + at(ix + 1, iy) * fx) * (1 - fy)
            + (at(ix, iy + 1) * (1 - fx) + at(ix + 1, iy + 1) * fx) * fy;
        };
      }

      // Candidate patches at four different scales, derived from the real mask.
      // The pointer selects a NEW subset instead of always showing the same boxes.
      function findBrightRegions(table) {
        const stride = GRID + 1, integral = new Float32Array(stride * stride);
        for (let y = 1; y <= GRID; y++) {
          let row = 0;
          for (let x = 1; x <= GRID; x++) {
            row += table[(y - 1) * GRID + x - 1];
            integral[y * stride + x] = integral[(y - 1) * stride + x] + row;
          }
        }
        const patches = [];
        for (const [bw, bh] of [[10,8], [14,12], [18,16], [23,21]]) {
          for (let y = 1; y < GRID - bh; y += 4) {
            for (let x = 1; x < GRID - bw; x += 4) {
              const sum = integral[(y + bh) * stride + x + bw] - integral[y * stride + x + bw]
                - integral[(y + bh) * stride + x] + integral[y * stride + x];
              const score = sum / (bw * bh);
              if (score > .24) patches.push({ u: x / GRID, v: y / GRID, w: bw / GRID, h: bh / GRID, score });
            }
          }
        }
        return patches;
      }

      class SignalCard {
        constructor(element) {
          this.element = element;
          this.brand = BRANDS[element.dataset.brand];
          element.querySelector('.mark path').setAttribute('d', this.brand.path);
          this.canvas = element.querySelector('.art');
          this.ctx = this.canvas.getContext('2d');
          this.table = makeBrightnessTable(this.brand.path);
          this.regions = findBrightRegions(this.table);
          this.noise = noiseField(this.brand.seed);
          this.pointer = { x: -1000, y: -1000, energy: 0, inside: false };
          this.focused = false; this.touchUntil = 0; this.hover = 0; this.visible = true;
          this.selectionKey = ''; this.boxes = [];
          const count = COLS * (ROWS + 1);
          this.dx = new Float32Array(count); this.dy = new Float32Array(count);
          this.vx = new Float32Array(count); this.vy = new Float32Array(count);
          this.levels = new Uint8Array(COLS * ROWS);
          this.mask = new Float32Array(COLS * ROWS);
          this.observer = new ResizeObserver(() => this.resize());
          this.observer.observe(element);
          this.resize();
          element.addEventListener('pointerenter', e => {
            if (e.pointerType !== 'touch') { this.pointer.inside = true; this.move(e); this.pointer.energy = 1; }
          });
          element.addEventListener('pointermove', e => this.move(e), { passive: true });
          element.addEventListener('pointerleave', () => { this.pointer.inside = false; });
          element.addEventListener('pointercancel', () => { this.pointer.inside = false; this.touchUntil = 0; });
          element.addEventListener('pointerdown', e => {
            if (e.pointerType === 'touch' && !e.target.closest('button')) {
              this.move(e); this.pointer.energy = 1.4; this.touchUntil = performance.now() + 1800;
            }
          }, { passive: true });
          element.addEventListener('focusin', () => { this.focused = true; });
          element.addEventListener('focusout', e => { if (!element.contains(e.relatedTarget)) this.focused = false; });
          element.querySelector('.source').addEventListener('click', () => showSource(this.brand));
        }

        move(e) {
          if (e.pointerType === 'touch' && e.type === 'pointermove') return;
          const rect = scope.rect(this.element), p = this.pointer;
          const x = scope.point(e).x - rect.left, y = scope.point(e).y - rect.top;
          p.energy = Math.min(1.8, p.energy + Math.hypot(x - p.x, y - p.y) * .016);
          p.x = x; p.y = y;
        }

        resize() {
          const { width, height } = scope.rect(this.element);
          this.w = width; this.h = height; this.dpr = window.devicePixelRatio || 1;
          this.canvas.width = Math.round(width * this.dpr);
          this.canvas.height = Math.round(height * this.dpr);
          this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
          this.sx = width / COLS; this.sy = height / ROWS;
          this.logo = { x: this.brand.pose.x * width, y: this.brand.pose.y * height, size: this.brand.pose.size * width };
          this.dx.fill(0); this.dy.fill(0); this.vx.fill(0); this.vy.fill(0);
          for (let c = 0; c < COLS; c++) {
            for (let r = 0; r < ROWS; r++) {
              const u = ((c + .5) * this.sx - this.logo.x) / this.logo.size;
              const v = ((r + .5) * this.sy - this.logo.y) / this.logo.size;
              this.mask[c * ROWS + r] = sample(this.table, u, v);
            }
          }
          this.selectionKey = '';
          this.updateDetections();
          // Paint once even below the fold; subsequent animation is visibility-gated.
          this.frame(0, 1 / 60, performance.now(), true);
        }

        updateDetections() {
          const p = this.pointer, live = p.inside || performance.now() < this.touchUntil;
          const px = live ? clamp(p.x, 0, this.w) : this.w * .5;
          const py = live ? clamp(p.y, 0, this.h) : this.h * .42;
          // Coarse pointer cells prevent tiny movements from making the layout flicker.
          const qx = Math.floor(px / (this.sx * 3)), qy = Math.floor(py / (this.sy * 5));
          const key = `${qx}:${qy}`;
          if (key === this.selectionKey) return;
          this.selectionKey = key;
          const hash = (Math.imul(qx + 1, 73856093) ^ Math.imul(qy + 1, 19349663) ^ this.brand.seed) >>> 0;
          const count = 1 + hash % 3;
          const u = clamp((px - this.logo.x) / this.logo.size);
          const v = clamp((py - this.logo.y) / this.logo.size);
          const targets = [
            { u, v },
            { u: clamp(1 - u + ((hash >>> 4) % 5 - 2) * .06), v: clamp(1 - v) },
            { u: clamp(.2 + ((hash >>> 8) % 7) * .1), v: clamp(.1 + ((hash >>> 12) % 8) * .1) }
          ];
          const chosen = [];
          for (let slot = 0; slot < count; slot++) {
            const target = targets[slot];
            const preferredWidth = [10,14,18,23][(hash >>> (slot * 3 + 2)) % 4] / GRID;
            let winner = null, best = -Infinity;
            for (const region of this.regions) {
              const cx = region.u + region.w / 2, cy = region.v + region.h / 2;
              if (chosen.some(q => {
                const overlapX = Math.max(0, Math.min(region.u + region.w, q.u + q.w) - Math.max(region.u, q.u));
                const overlapY = Math.max(0, Math.min(region.v + region.h, q.v + q.h) - Math.max(region.v, q.v));
                return overlapX * overlapY > Math.min(region.w * region.h, q.w * q.h) * .12
                  || Math.hypot(cx - q.u - q.w / 2, cy - q.v - q.h / 2) < .20;
              })) continue;
              const distance = Math.hypot(cx - target.u, cy - target.v);
              const score = region.score * .38 - distance * 2.1 - Math.abs(region.w - preferredWidth) * 2.7;
              if (score > best) { best = score; winner = region; }
            }
            if (winner) chosen.push(winner);
          }
          const snapX = n => Math.round(n / this.sx) * this.sx;
          const snapY = n => Math.round(n / this.sy) * this.sy;
          this.boxes = chosen.map(region => {
            const w = snapX(region.w * this.logo.size), h = snapY(region.h * this.logo.size);
            return {
              x: snapX(clamp(this.logo.x + region.u * this.logo.size, this.sx, this.w - w - this.sx)),
              y: snapY(clamp(this.logo.y + region.v * this.logo.size, this.sy, this.h - h - this.sy)), w, h
            };
          });
        }

        frame(time, dt, now, forcePaint = false) {
          if (!this.visible && !forcePaint) return;
          if (this.dpr !== (window.devicePixelRatio || 1)) this.resize();
          const ctx = this.ctx, p = this.pointer, still = reducedMotion.matches;
          const active = p.inside || this.focused || now < this.touchUntil;
          this.hover += ((active ? 1 : 0) - this.hover) * (1 - Math.exp(-dt * 8));
          p.energy *= Math.exp(-dt * 2.8);
          const radius = this.w * .29;
          // A bounded substep keeps the spring stable on 30Hz screens and on resume.
          const steps = Math.ceil(dt / .009), step = dt / steps;
          const force = active && !still ? p.energy : 0;
          for (let c = 0; c < COLS; c++) {
            const x = (c + .5) * this.sx;
            for (let r = 0; r <= ROWS; r++) {
              const i = c * (ROWS + 1) + r, y = r * this.sy;
              const px = x - p.x, py = y - p.y, distance = Math.hypot(px, py);
              const falloff = Math.pow(clamp(1 - distance / radius), 2);
              const push = falloff * force * this.w * .13;
              const tx = px / Math.max(distance, 1) * push;
              const ty = py / Math.max(distance, 1) * push * .48;
              for (let s = 0; s < steps; s++) {
                this.vx[i] += ((tx - this.dx[i]) * 155 - this.vx[i] * 12) * step;
                this.vy[i] += ((ty - this.dy[i]) * 155 - this.vy[i] * 12) * step;
                this.dx[i] += this.vx[i] * step; this.dy[i] += this.vy[i] * step;
              }
              if (r < ROWS) {
                const j = c * ROWS + r;
                const n = this.noise(c * 1.57, r * .13 - (still ? 0 : time * .33));
                const detail = this.noise(c * .63 + 12, r * .31 - (still ? 0 : time * .16));
                const luminance = this.mask[j] * (.45 + n * .55) + (detail - .5) * .12;
                this.levels[j] = luminance < .10 ? 0 : luminance < .43 ? 1 : luminance < .68 ? 2 : 3;
              }
            }
          }
          // Clear and redraw ONLY vertical-line segments; no drawImage / SVG overlay.
          ctx.clearRect(0, 0, this.w, this.h);
          ctx.lineCap = 'round'; ctx.lineJoin = 'miter';
          const scale = this.w / 400;
          for (let level = 0; level < 4; level++) {
            ctx.beginPath(); ctx.lineWidth = WIDTHS[level] * scale;
            const opacity = ALPHAS[level] * (this.brand.name === 'Apple' ? .73 : .92);
            ctx.strokeStyle = `rgba(${this.brand.ink},${opacity})`;
            for (let c = 0; c < COLS; c++) {
              const x = (c + .5) * this.sx;
              for (let r = 0; r < ROWS; r++) {
                if (this.levels[c * ROWS + r] !== level) continue;
                const i = c * (ROWS + 1) + r, y = r * this.sy;
                // Shared endpoints keep a fine continuous stem through each joint.
                ctx.moveTo(x + this.dx[i], y + this.dy[i]);
                ctx.lineTo(x + this.dx[i + 1], y + this.sy + this.dy[i + 1]);
              }
            }
            ctx.stroke();
          }
          if (this.hover > .015) {
            if (active) this.updateDetections();
            this.drawDetections();
          }
        }

        drawDetections() {
          const ctx = this.ctx, boxes = this.boxes, h = this.hover;
          ctx.save(); ctx.strokeStyle = ctx.fillStyle = this.brand.detector;
          ctx.lineCap = 'butt'; ctx.globalAlpha = h * .8; ctx.lineWidth = .65;
          const corners = b => [[b.x,b.y], [b.x+b.w,b.y], [b.x,b.y+b.h], [b.x+b.w,b.y+b.h]];
          // Reconnect the closest CORNERS of the selected boxes, not their centers.
          // A minimal tree changes its branches naturally as the mouse moves.
          const connected = new Set([0]);
          ctx.beginPath();
          while (connected.size < boxes.length) {
            let edge = null, shortest = Infinity;
            for (const from of connected) {
              for (let to = 0; to < boxes.length; to++) {
                if (connected.has(to)) continue;
                for (const a of corners(boxes[from])) for (const b of corners(boxes[to])) {
                  const distance = Math.hypot(a[0] - b[0], a[1] - b[1]);
                  if (distance < shortest) { shortest = distance; edge = { a, b, to }; }
                }
              }
            }
            if (!edge) break;
            ctx.moveTo(...edge.a); ctx.lineTo(...edge.b); connected.add(edge.to);
          }
          ctx.stroke();
          const fontSize = clamp(this.w * .021, 8, 11), labelHeight = fontSize + 3;
          ctx.font = `${fontSize}px Consolas, monospace`; ctx.textBaseline = 'top';
          boxes.forEach(b => {
            const {x, y, w, h: bh} = b;
            ctx.fillStyle = this.brand.detector; ctx.globalAlpha = h * .035; ctx.fillRect(x,y,w,bh);
            ctx.globalAlpha = h; ctx.lineWidth = .8; ctx.strokeRect(x,y,w,bh);
            for (const [cx,cy] of corners(b)) ctx.fillRect(cx - 1, cy - 1, 2, 2);
            const text = `${Math.round(x)}, ${Math.round(y)}`;
            const labelWidth = ctx.measureText(text).width + 5;
            ctx.fillRect(x,y,labelWidth,labelHeight);
            ctx.fillStyle = this.brand.labelInk; ctx.fillText(text,x + 2.5,y + 1);
          });
          ctx.restore();
        }
      }

      const dialog = document.querySelector('#source-dialog');
      let selectedBrand;
      function showSource(brand) {
        selectedBrand = brand;
        document.querySelector('#source-title').textContent = `${brand.name} / The source`;
        document.querySelector('#path-source').textContent = `<path d="${brand.path}" />`;
        document.querySelector('#copy-status').textContent = 'No images. No libraries. Just lines.';
        dialog.showModal();
      }
      document.querySelector('.close').addEventListener('click', () => dialog.close());
      dialog.addEventListener('click', e => {
        const r = scope.rect(dialog);
        if (scope.point(e).x < r.left || scope.point(e).x > r.right || scope.point(e).y < r.top || scope.point(e).y > r.bottom) dialog.close();
      });
      document.querySelector('.copy').addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(selectedBrand.path);
          document.querySelector('#copy-status').textContent = 'SVG path copied';
        } catch {
          const selection = window.getSelection(), range = document.createRange();
          range.selectNodeContents(document.querySelector('#path-source'));
          selection.removeAllRanges(); selection.addRange(range);
          document.querySelector('#copy-status').textContent = 'Path selected — press Ctrl+C or ⌘C to copy';
        }
      });

      const cards = [...document.querySelectorAll('.card')].map(element => new SignalCard(element));
      const visibility = new IntersectionObserver(entries => {
        for (const entry of entries) cards.find(card => card.element === entry.target).visible = entry.isIntersecting;
      });
      cards.forEach(card => visibility.observe(card.element));
      let lastTime = performance.now(), elapsed = 0, raf = 0;
      function animate(now) {
        const dt = Math.min((now - lastTime) / 1000, .034); lastTime = now;
        if (!reducedMotion.matches) elapsed += dt;
        cards.forEach(card => card.frame(elapsed, dt, now));
        raf = requestAnimationFrame(animate);
      }
      document.addEventListener('visibilitychange', () => {
        cancelAnimationFrame(raf);
        if (!document.hidden) { lastTime = performance.now(); raf = requestAnimationFrame(animate); }
      });
      window.addEventListener('resize', () => cards.forEach(card => card.resize()), { passive: true });
      raf = requestAnimationFrame(animate);
    })();
  

scope.ready();
return scope.controller;
}
