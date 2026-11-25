// Plain DOM implementation — no iframe, no runtime eval.
import { createSurface } from "./motion-runtime";
export function mountDotMatrixTrio(target, options = {}) {
const scope = createSurface(target, {"markup":"<main class=\"dm-scene notranslate\" translate=\"no\" aria-label=\"Dot Matrix Ripple and Spiral\"><div class=\"dm-stage\"><button type=\"button\" class=\"dm-poster\" data-pattern=\"ripple\" aria-label=\"Ripple · pause or resume animation\" aria-pressed=\"false\"><canvas class=\"dm-canvas\" aria-hidden=\"true\"></canvas><span class=\"dm-footer\"><span class=\"dm-brand\"><svg class=\"dm-brand-logo\" viewBox=\"0 0 520 180\" aria-label=\"Solen\" role=\"img\"><g transform=\"translate(6 16) scale(0.74)\"><g data-dm-symbol fill=\"currentColor\"><path d=\"M 165.3 65.3 L 167.8 70.4 L 169.9 75.8 L 171.6 81.3 L 172.8 86.9 L 173.6 92.6 L 174.0 98.3 L 173.9 104.0 L 173.4 109.7 L 172.4 115.4 L 171.0 120.9 L 169.1 126.4 L 166.9 131.7 L 164.2 136.8 L 161.2 141.6 L 157.8 146.2 L 154.0 150.6 L 149.9 154.6 L 145.6 158.3 L 140.9 161.7 L 136.0 164.7 L 130.9 167.2 L 125.6 169.4 L 120.1 171.2 L 114.5 172.6 L 108.9 173.5 L 103.2 173.9 L 97.4 174.0 L 91.7 173.5 L 86.0 172.7 L 80.4 171.4 L 75.0 169.6 L 69.6 167.5 L 64.5 164.9 L 59.6 162.0 L 54.9 158.7 L 50.5 155.0 L 54.5 150.5 L 59.0 153.4 L 63.6 155.8 L 68.3 157.9 L 73.2 159.6 L 78.1 160.9 L 83.1 161.7 L 88.0 162.2 L 93.0 162.3 L 97.8 162.0 L 102.6 161.3 L 107.3 160.2 L 111.8 158.8 L 116.1 157.1 L 120.3 155.1 L 124.2 152.7 L 127.9 150.1 L 131.3 147.2 L 134.5 144.1 L 137.3 140.8 L 139.9 137.4 L 142.2 133.7 L 144.1 130.0 L 145.7 126.2 L 147.0 122.2 L 148.0 118.3 L 148.6 114.3 L 148.9 110.4 L 148.9 106.5 L 148.6 102.6 L 148.0 98.9 L 147.1 95.2 L 145.9 91.7 L 144.5 88.4 L 142.8 85.2 L 140.9 82.1 L 138.8 79.3 Z\"/><path d=\"M 38.2 132.9 L 36.0 128.3 L 34.1 123.6 L 32.5 118.7 L 31.4 113.8 L 30.5 108.7 L 30.1 103.7 L 30.0 98.6 L 30.3 93.5 L 31.0 88.4 L 32.0 83.5 L 33.4 78.6 L 35.1 73.8 L 37.2 69.1 L 39.6 64.6 L 42.3 60.4 L 45.3 56.3 L 48.7 52.4 L 52.3 48.8 L 56.1 45.5 L 60.2 42.4 L 64.5 39.7 L 68.9 37.3 L 73.6 35.2 L 78.4 33.4 L 83.3 32.0 L 88.2 31.0 L 93.3 30.3 L 98.4 30.0 L 103.5 30.1 L 108.5 30.5 L 113.6 31.3 L 118.5 32.5 L 123.4 34.0 L 128.1 35.9 L 132.7 38.1 L 137.1 40.6 L 133.9 45.7 L 129.6 43.9 L 125.2 42.5 L 120.8 41.4 L 116.3 40.6 L 111.8 40.2 L 107.4 40.1 L 103.0 40.4 L 98.6 40.9 L 94.4 41.8 L 90.3 42.9 L 86.3 44.4 L 82.5 46.1 L 78.9 48.1 L 75.4 50.3 L 72.2 52.8 L 69.2 55.4 L 66.4 58.2 L 63.9 61.2 L 61.6 64.4 L 59.6 67.6 L 57.8 71.0 L 56.4 74.5 L 55.2 78.0 L 54.3 81.5 L 53.6 85.1 L 53.3 88.6 L 53.2 92.2 L 53.3 95.6 L 53.7 99.1 L 54.4 102.4 L 55.3 105.6 L 56.4 108.7 L 57.8 111.7 L 59.3 114.5 L 61.0 117.2 L 62.9 119.7 Z\"/><circle cx=\"52.5\" cy=\"152.8\" r=\"3\"/><circle cx=\"135.5\" cy=\"43.2\" r=\"3\"/></g><rect fill=\"#f2662a\" x=\"137\" y=\"59\" width=\"11\" height=\"3.5\" rx=\"1.75\" transform=\"rotate(-25 142 61)\"/><path d=\"M 180.8 85.8 A 82 82 0 0 1 78.8 179.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><text x=\"178\" y=\"124\" fill=\"currentColor\" font-family=\"Helvetica Neue, Helvetica, Arial, sans-serif\" font-weight=\"500\" font-size=\"100\" textLength=\"300\" lengthAdjust=\"spacingAndGlyphs\">Solen</text></svg>\r\n</span><span class=\"dm-copy\" lang=\"en\">Browse interfaces<br>Collect UI ideas<br>Save handy pieces</span><i class=\"dm-corner dm-corner--br\" aria-hidden=\"true\"></i><i class=\"dm-corner dm-corner--tr\" aria-hidden=\"true\"></i></span></button><button type=\"button\" class=\"dm-poster\" data-pattern=\"spiral\" aria-label=\"Spiral · pause or resume animation\" aria-pressed=\"false\"><canvas class=\"dm-canvas\" aria-hidden=\"true\"></canvas><span class=\"dm-footer\"><i class=\"dm-corner dm-corner--tl\" aria-hidden=\"true\"></i><svg class=\"dm-wordmark\" viewBox=\"0 0 520 180\" aria-label=\"Solen\" role=\"img\"><g transform=\"translate(6 16) scale(0.74)\"><g fill=\"currentColor\"><path d=\"M 165.3 65.3 L 167.8 70.4 L 169.9 75.8 L 171.6 81.3 L 172.8 86.9 L 173.6 92.6 L 174.0 98.3 L 173.9 104.0 L 173.4 109.7 L 172.4 115.4 L 171.0 120.9 L 169.1 126.4 L 166.9 131.7 L 164.2 136.8 L 161.2 141.6 L 157.8 146.2 L 154.0 150.6 L 149.9 154.6 L 145.6 158.3 L 140.9 161.7 L 136.0 164.7 L 130.9 167.2 L 125.6 169.4 L 120.1 171.2 L 114.5 172.6 L 108.9 173.5 L 103.2 173.9 L 97.4 174.0 L 91.7 173.5 L 86.0 172.7 L 80.4 171.4 L 75.0 169.6 L 69.6 167.5 L 64.5 164.9 L 59.6 162.0 L 54.9 158.7 L 50.5 155.0 L 54.5 150.5 L 59.0 153.4 L 63.6 155.8 L 68.3 157.9 L 73.2 159.6 L 78.1 160.9 L 83.1 161.7 L 88.0 162.2 L 93.0 162.3 L 97.8 162.0 L 102.6 161.3 L 107.3 160.2 L 111.8 158.8 L 116.1 157.1 L 120.3 155.1 L 124.2 152.7 L 127.9 150.1 L 131.3 147.2 L 134.5 144.1 L 137.3 140.8 L 139.9 137.4 L 142.2 133.7 L 144.1 130.0 L 145.7 126.2 L 147.0 122.2 L 148.0 118.3 L 148.6 114.3 L 148.9 110.4 L 148.9 106.5 L 148.6 102.6 L 148.0 98.9 L 147.1 95.2 L 145.9 91.7 L 144.5 88.4 L 142.8 85.2 L 140.9 82.1 L 138.8 79.3 Z\"/><path d=\"M 38.2 132.9 L 36.0 128.3 L 34.1 123.6 L 32.5 118.7 L 31.4 113.8 L 30.5 108.7 L 30.1 103.7 L 30.0 98.6 L 30.3 93.5 L 31.0 88.4 L 32.0 83.5 L 33.4 78.6 L 35.1 73.8 L 37.2 69.1 L 39.6 64.6 L 42.3 60.4 L 45.3 56.3 L 48.7 52.4 L 52.3 48.8 L 56.1 45.5 L 60.2 42.4 L 64.5 39.7 L 68.9 37.3 L 73.6 35.2 L 78.4 33.4 L 83.3 32.0 L 88.2 31.0 L 93.3 30.3 L 98.4 30.0 L 103.5 30.1 L 108.5 30.5 L 113.6 31.3 L 118.5 32.5 L 123.4 34.0 L 128.1 35.9 L 132.7 38.1 L 137.1 40.6 L 133.9 45.7 L 129.6 43.9 L 125.2 42.5 L 120.8 41.4 L 116.3 40.6 L 111.8 40.2 L 107.4 40.1 L 103.0 40.4 L 98.6 40.9 L 94.4 41.8 L 90.3 42.9 L 86.3 44.4 L 82.5 46.1 L 78.9 48.1 L 75.4 50.3 L 72.2 52.8 L 69.2 55.4 L 66.4 58.2 L 63.9 61.2 L 61.6 64.4 L 59.6 67.6 L 57.8 71.0 L 56.4 74.5 L 55.2 78.0 L 54.3 81.5 L 53.6 85.1 L 53.3 88.6 L 53.2 92.2 L 53.3 95.6 L 53.7 99.1 L 54.4 102.4 L 55.3 105.6 L 56.4 108.7 L 57.8 111.7 L 59.3 114.5 L 61.0 117.2 L 62.9 119.7 Z\"/><circle cx=\"52.5\" cy=\"152.8\" r=\"3\"/><circle cx=\"135.5\" cy=\"43.2\" r=\"3\"/></g><rect fill=\"#f2662a\" x=\"137\" y=\"59\" width=\"11\" height=\"3.5\" rx=\"1.75\" transform=\"rotate(-25 142 61)\"/><path d=\"M 180.8 85.8 A 82 82 0 0 1 78.8 179.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><text x=\"178\" y=\"124\" fill=\"currentColor\" font-family=\"Helvetica Neue, Helvetica, Arial, sans-serif\" font-weight=\"500\" font-size=\"100\" textLength=\"300\" lengthAdjust=\"spacingAndGlyphs\">Solen</text></svg><i class=\"dm-corner dm-corner--tr\" aria-hidden=\"true\"></i></span></button><button type=\"button\" class=\"dm-poster\" data-pattern=\"pulse\" aria-label=\"Pulse · pause or resume animation\" aria-pressed=\"false\"><canvas class=\"dm-canvas\" aria-hidden=\"true\"></canvas><span class=\"dm-footer\"><span class=\"dm-brand\"><svg class=\"dm-brand-logo\" viewBox=\"0 0 520 180\" aria-label=\"Solen\" role=\"img\"><g transform=\"translate(6 16) scale(0.74)\"><g data-dm-symbol fill=\"currentColor\"><path d=\"M 165.3 65.3 L 167.8 70.4 L 169.9 75.8 L 171.6 81.3 L 172.8 86.9 L 173.6 92.6 L 174.0 98.3 L 173.9 104.0 L 173.4 109.7 L 172.4 115.4 L 171.0 120.9 L 169.1 126.4 L 166.9 131.7 L 164.2 136.8 L 161.2 141.6 L 157.8 146.2 L 154.0 150.6 L 149.9 154.6 L 145.6 158.3 L 140.9 161.7 L 136.0 164.7 L 130.9 167.2 L 125.6 169.4 L 120.1 171.2 L 114.5 172.6 L 108.9 173.5 L 103.2 173.9 L 97.4 174.0 L 91.7 173.5 L 86.0 172.7 L 80.4 171.4 L 75.0 169.6 L 69.6 167.5 L 64.5 164.9 L 59.6 162.0 L 54.9 158.7 L 50.5 155.0 L 54.5 150.5 L 59.0 153.4 L 63.6 155.8 L 68.3 157.9 L 73.2 159.6 L 78.1 160.9 L 83.1 161.7 L 88.0 162.2 L 93.0 162.3 L 97.8 162.0 L 102.6 161.3 L 107.3 160.2 L 111.8 158.8 L 116.1 157.1 L 120.3 155.1 L 124.2 152.7 L 127.9 150.1 L 131.3 147.2 L 134.5 144.1 L 137.3 140.8 L 139.9 137.4 L 142.2 133.7 L 144.1 130.0 L 145.7 126.2 L 147.0 122.2 L 148.0 118.3 L 148.6 114.3 L 148.9 110.4 L 148.9 106.5 L 148.6 102.6 L 148.0 98.9 L 147.1 95.2 L 145.9 91.7 L 144.5 88.4 L 142.8 85.2 L 140.9 82.1 L 138.8 79.3 Z\"/><path d=\"M 38.2 132.9 L 36.0 128.3 L 34.1 123.6 L 32.5 118.7 L 31.4 113.8 L 30.5 108.7 L 30.1 103.7 L 30.0 98.6 L 30.3 93.5 L 31.0 88.4 L 32.0 83.5 L 33.4 78.6 L 35.1 73.8 L 37.2 69.1 L 39.6 64.6 L 42.3 60.4 L 45.3 56.3 L 48.7 52.4 L 52.3 48.8 L 56.1 45.5 L 60.2 42.4 L 64.5 39.7 L 68.9 37.3 L 73.6 35.2 L 78.4 33.4 L 83.3 32.0 L 88.2 31.0 L 93.3 30.3 L 98.4 30.0 L 103.5 30.1 L 108.5 30.5 L 113.6 31.3 L 118.5 32.5 L 123.4 34.0 L 128.1 35.9 L 132.7 38.1 L 137.1 40.6 L 133.9 45.7 L 129.6 43.9 L 125.2 42.5 L 120.8 41.4 L 116.3 40.6 L 111.8 40.2 L 107.4 40.1 L 103.0 40.4 L 98.6 40.9 L 94.4 41.8 L 90.3 42.9 L 86.3 44.4 L 82.5 46.1 L 78.9 48.1 L 75.4 50.3 L 72.2 52.8 L 69.2 55.4 L 66.4 58.2 L 63.9 61.2 L 61.6 64.4 L 59.6 67.6 L 57.8 71.0 L 56.4 74.5 L 55.2 78.0 L 54.3 81.5 L 53.6 85.1 L 53.3 88.6 L 53.2 92.2 L 53.3 95.6 L 53.7 99.1 L 54.4 102.4 L 55.3 105.6 L 56.4 108.7 L 57.8 111.7 L 59.3 114.5 L 61.0 117.2 L 62.9 119.7 Z\"/><circle cx=\"52.5\" cy=\"152.8\" r=\"3\"/><circle cx=\"135.5\" cy=\"43.2\" r=\"3\"/></g><rect fill=\"#f2662a\" x=\"137\" y=\"59\" width=\"11\" height=\"3.5\" rx=\"1.75\" transform=\"rotate(-25 142 61)\"/><path d=\"M 180.8 85.8 A 82 82 0 0 1 78.8 179.2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\"/></g><text x=\"178\" y=\"124\" fill=\"currentColor\" font-family=\"Helvetica Neue, Helvetica, Arial, sans-serif\" font-weight=\"500\" font-size=\"100\" textLength=\"300\" lengthAdjust=\"spacingAndGlyphs\">Solen</text></svg>\r\n</span><span class=\"dm-copy\" lang=\"en\">Watch animations<br>Inspect the code<br>Rebuild your own</span><i class=\"dm-corner dm-corner--br\" aria-hidden=\"true\"></i><i class=\"dm-corner dm-corner--tr\" aria-hidden=\"true\"></i></span></button></div><span class=\"dm-status\" role=\"status\" aria-live=\"polite\"></span></main>","css":"* { box-sizing: border-box; }\r\nhtml, body { margin: 0; width: 100%; height: 100%; }\r\n.dm-scene {\r\n  position: relative; width: 100%; height: 100vh; overflow: hidden; isolation: isolate;\r\n  background: linear-gradient(100deg, #ffffff0c, #ffffff00), linear-gradient(180deg, #5152c8 0%, #6386c7 30%, #79cdd0 68%, #a7f1da 100%);\r\n  color: #050505; font-family: Arial, Helvetica, \"PingFang SC\", \"Microsoft YaHei\", \"Noto Sans CJK SC\", sans-serif; -webkit-font-smoothing: antialiased;\r\n}\r\n.dm-stage { position: absolute; left: 50%; top: 50%; width: 960px; height: 540px; transform: translate(-50%, -50%) scale(var(--dm-scale, 1)); }\r\n.dm-poster { position: absolute; top: 98.5px; width: 213px; height: 341px; padding: 0; margin: 0; border: 0; border-radius: 0; background: #fdfdfd; color: #050505; font: inherit; text-align: left; cursor: pointer; -webkit-tap-highlight-color: transparent; }\r\n.dm-poster:nth-child(1) { left: 125px; }\r\n.dm-poster:nth-child(2) { left: 369.5px; }\r\n.dm-poster:nth-child(3) { left: 614px; }\r\n.dm-poster:focus-visible { outline: 3px solid #111; outline-offset: 7px; }\r\n.dm-poster[aria-pressed=\"true\"]::after { content: \"Ⅱ\"; position: absolute; right: 12px; top: 12px; display: grid; place-items: center; width: 24px; height: 24px; background: #fdfdfde8; color: #111; border-radius: 50%; font-size: 12px; font-weight: 700; }\r\n.dm-canvas { display: block; width: 213px; height: 213px; }\r\n.dm-footer { display: block; position: relative; height: 128px; padding: 18.5px; }\r\n.dm-brand { display: flex; align-items: center; height: 17px; }\r\n.dm-brand-logo { display: block; width: 49.36px; height: 17px; }\r\n.dm-copy { display: block; position: absolute; top: 61px; left: 18.5px; margin: 0; font-size: 16.8px; line-height: 17.2px; font-weight: 600; letter-spacing: -.65px; }\r\n.dm-wordmark { position: absolute; bottom: 17px; left: 18.5px; display: block; width: 176px; height: 60.93px; }\r\n.dm-corner { position: absolute; width: 6px; height: 6px; border-color: #222; border-style: solid; border-width: 0; }\r\n.dm-corner--tl { top: 18.5px; left: 18.5px; border-top-width: .5px; border-left-width: .5px; }\r\n.dm-corner--tr { top: 18.5px; right: 18.5px; border-top-width: .5px; border-right-width: .5px; }\r\n.dm-corner--br { bottom: 18.5px; right: 18.5px; border-bottom-width: .5px; border-right-width: .5px; }\r\n.dm-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }\r\n","width":960,"height":540,"responsive":false}, options);
const { document, window, requestAnimationFrame, cancelAnimationFrame, setTimeout, clearTimeout, setInterval, clearInterval, ResizeObserver, IntersectionObserver, matchMedia } = scope;
/* global scope */
// Built from scratch — no external assets or code.
const scene = document.querySelector('.dm-scene');
const stage = scene.querySelector('.dm-stage');
const posters = [...scene.querySelectorAll('.dm-poster')];
const canvases = posters.map(node => node.querySelector('canvas'));
const contexts = canvases.map(canvas => canvas.getContext('2d'));
const brandMark = [...scene.querySelectorAll('[data-dm-symbol] path')].map(node => new Path2D(node.getAttribute('d')));
const status = scene.querySelector('.dm-status');
const media = window.matchMedia('(prefers-reduced-motion: reduce)');
const tau = Math.PI * 2;
let clock = 0, last = 0, frame = 0, paused = false, visible = true, disposed = false, optionObserver;
let density = 0;

function mark(ctx, x, y, size, color) {
  ctx.save(); ctx.translate(x + size / 2, y + size / 2);
  ctx.scale(size / 144, size / 144); ctx.translate(-102, -102);
  ctx.fillStyle = color; brandMark.forEach(path => ctx.fill(path)); ctx.restore();
}
function dot(ctx, x, y, radius, color) {
  ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, radius, 0, tau); ctx.fill();
}
function draw() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  if (density !== dpr) {
    density = dpr;
    canvases.forEach(canvas => { canvas.width = Math.round(213 * dpr); canvas.height = Math.round(213 * dpr); });
  }
  contexts.forEach((ctx, index) => {
    ctx.setTransform(density, 0, 0, density, 0, 0);
    ctx.fillStyle = index === 2 ? '#fdfdfd' : '#050505'; ctx.fillRect(0, 0, 213, 213);
    if (index < 2) { ctx.fillStyle = '#000'; ctx.fillRect(8, 12, 197, 191); }
    const phase = (clock + 2 - 1 / 30) % 2;
    const radius = phase * 76;
    for (let row = 0; row < 20; row++) for (let col = 0; col < 20; col++) {
      const x = 20 + col * 173 / 19, y = 20 + row * 173 / 19;
      const dx = x - 106.5, dy = y - 106.5, distance = Math.hypot(dx, dy);
      if (index < 2 && col >= 8 && col <= 11 && row >= 8 && row <= 11) continue;
      if (index === 2 && col >= 9 && col <= 10 && row >= 9 && row <= 10) continue;
      let color;
      if (index === 0) color = Math.sin(distance * .074 + 1.37 - clock * Math.PI / 2) > 0 ? '#dfff8f' : '#31afe9';
      else if (index === 1) {
        const wave = Math.sin(Math.atan2(dy, dx) * 8 + distance * .156 + 4.97 - clock * 4);
        if (wave < .25) continue;
        color = '#dfff8f';
      } else {
        const corner = (col <= 1 || col >= 18) && (row <= 1 || row >= 18) && !((col === 1 || col === 18) && (row === 1 || row === 18));
        if (corner) color = '#050505';
        else if (distance <= radius) color = '#e4ff8e';
        else continue;
      }
      dot(ctx, x, y, 3.35, color);
    }
    mark(ctx, 97.5, 97.5, 18, index === 2 ? '#050505' : '#fdfdfd');
  });
  scene.dataset.time = clock.toFixed(3);
  scene.dataset.paused = String(paused);
  scene.dataset.motion = media.matches ? 'reduced' : 'full';
  document.body.dataset.motionReady = 'true';
}
function stop() { cancelAnimationFrame(frame); frame = 0; last = 0; }
function tick(now) {
  frame = 0;
  if (disposed || paused || !visible || document.hidden || media.matches) { last = 0; return; }
  if (last) clock += Math.min((now - last) / 1000, .05);
  last = now; draw(); frame = requestAnimationFrame(tick);
}
function wake() {
  if (!frame && !disposed && !paused && visible && !document.hidden && !media.matches) frame = requestAnimationFrame(tick);
}
function toggle() {
  paused = !paused; posters.forEach(poster => poster.setAttribute('aria-pressed', String(paused)));
  status.textContent = paused ? 'Animation paused' : media.matches ? 'Still frame · reduced motion' : 'Animation playing';
  if (paused) stop(); else wake(); draw();
}
function reset() {
  clock = 0; paused = false; stop(); posters.forEach(poster => poster.setAttribute('aria-pressed', 'false'));
  status.textContent = 'Animation reset'; draw(); wake();
}
posters.forEach(poster => {
  poster.addEventListener('click', toggle);
  poster.addEventListener('keydown', event => {
    if (event.key === 'Escape' || event.key === 'Home') { event.preventDefault(); reset(); }
    else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); paused = true; stop(); clock = Math.max(0, clock + (event.key === 'ArrowRight' ? 1 : -1) / 30);
      posters.forEach(node => node.setAttribute('aria-pressed', 'true')); status.textContent = 'Animation stepped one frame'; draw();
    }
  });
});
function syncMotion() { stop(); draw(); wake(); }
media.addEventListener('change', syncMotion);
document.addEventListener('visibilitychange', () => document.hidden ? stop() : wake());
const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) wake(); else stop(); });
intersection.observe(scene);
function resize() {
  const rect = scope.rect(scene);
  stage.style.setProperty('--dm-scale', String(Math.min(rect.width / 960, rect.height / 540)));
  draw();
}
const observer = new ResizeObserver(resize); observer.observe(scene);
function dispose() {
  disposed = true; stop(); observer.disconnect(); intersection.disconnect(); optionObserver?.disconnect(); media.removeEventListener('change', syncMotion);
  canvases.forEach(canvas => { canvas.width = 0; canvas.height = 0; });
}
if (typeof scope !== 'undefined') {
  scope.addCleanup(dispose);
  optionObserver = new MutationObserver(syncMotion);
  optionObserver.observe(scope.element, { attributes: true, attributeFilter: ['data-reduced-motion'] });
} else window.addEventListener('pagehide', dispose, { once: true });
resize(); draw(); wake();


scope.ready();
return scope.controller;
}
