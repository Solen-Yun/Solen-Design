// src/lib/motion-core/particle-texture-trio.mjs
import { createSurface } from "./motion-runtime";

// src/lib/motion-core/particle-texture-contours.mjs
var WHITE_CONTOURS = [[[0.5328, 0.6803], [0.5328, 0.7295], [0.5574, 0.7459], [0.5738, 0.6803]], [[0.7869, 0.541], [0.7213, 0.5328], [0.6803, 0.5984], [0.7377, 0.5984]], [[0.6311, 0.582], [0.5738, 0.5738], [0.541, 0.6148], [0.3525, 0.6066], [0.3115, 0.6393], [0.3033, 0.5738], [0.2295, 0.5574], [0.2705, 0.5], [0.2459, 0.4918], [0.1885, 0.5328], [0.1967, 0.459], [0.1639, 0.459], [0.1475, 0.5], [0.0984, 0.4918], [0.0738, 0.5328], [-0.0164, 0.5738], [-0.0574, 0.6148], [-0.0574, 0.6721], [-0.0902, 0.6721], [-0.1066, 0.6393], [-0.1967, 0.6393], [-0.2377, 0.6803], [-0.377, 0.6885], [-0.3852, 0.7377], [-0.3197, 0.7951], [-0.3279, 0.8279], [-0.3852, 0.8197], [-0.4754, 0.6803], [-0.5656, 0.6803], [-0.5902, 0.6393], [-0.623, 0.6393], [-0.623, 0.5738], [-0.6557, 0.6311], [-0.7377, 0.5984], [-0.7377, 0.541], [-0.7705, 0.4918], [-0.8279, 0.5656], [-0.8279, 0.6311], [-0.7705, 0.6393], [-0.7541, 0.6721], [-0.6557, 0.6721], [-0.6311, 0.7131], [-0.541, 0.7049], [-0.5246, 0.7459], [-0.4672, 0.7459], [-0.4262, 0.8525], [-0.2787, 0.9836], [-0.2705, 1.0164], [-0.0656, 1.0164], [-0.0492, 0.9754], [82e-4, 0.9672], [0.0246, 0.9344], [0.0738, 0.9344], [0.1148, 0.8934], [0.1803, 0.8934], [0.2131, 0.9344], [0.4836, 0.9262], [0.4836, 0.9016], [0.377, 0.9016], [0.3279, 0.8607], [0.2705, 0.8525], [0.2705, 0.7541], [0.2131, 0.7541], [0.2049, 0.7213], [0.2377, 0.6803], [0.2951, 0.7049], [0.3525, 0.6393], [0.3934, 0.6721], [0.4426, 0.6721], [0.459, 0.6311], [0.5738, 0.6311], [0.5902, 0.6639]], [[0.0574, 0.8279], [0.0492, 0.8852], [82e-4, 0.8934], [0, 0.8689]], [[0.2049, 0.7623], [0.1967, 0.8197], [0.0902, 0.8197], [0.0984, 0.7705], [0.1557, 0.7869], [0.1803, 0.7541]], [[-0.3197, 0.7623], [-0.2541, 0.7459], [-0.2295, 0.7131], [-0.1475, 0.7131], [-0.0902, 0.7869], [-0.0328, 0.7951], [-82e-4, 0.8852], [-0.0902, 0.8607], [-0.123, 0.9262], [-0.2459, 0.9344], [-0.3115, 0.8852], [-0.3279, 0.8361], [-0.2951, 0.8279], [-0.2459, 0.8934], [-0.2049, 0.877]], [[0.0574, 0.5574], [0.1803, 0.5984], [0.2295, 0.6475], [0.1967, 0.7131], [0.0902, 0.7787], [0.0246, 0.7213], [-0.0164, 0.7295], [-0.0574, 0.6967]], [[0.0984, 0.418], [0.0902, 0.4508], [0.1148, 0.459], [0.123, 0.4262]], [[-0.5, 0.3934], [-0.4918, 0.4508], [-0.2705, 0.459], [-0.2787, 0.5574], [-0.2459, 0.5656], [-0.2377, 0.5984], [-0.3033, 0.6066], [-0.3115, 0.6311], [-0.2459, 0.6311], [-0.2377, 0.6066], [-0.1721, 0.5902], [-0.2377, 0.5164], [-0.2213, 0.4672], [-0.2787, 0.4508], [-0.2951, 0.3852]], [[-0.5574, 0.2705], [-0.582, 0.2951], [-0.5492, 0.3115], [-0.5328, 0.2787]], [[-0.7787, 0.2377], [-0.7869, 0.2951], [-0.7541, 0.3361], [-0.7049, 0.3443], [-0.6721, 0.3852], [-0.623, 0.3852], [-0.5492, 0.4918], [-0.5328, 0.3607], [-0.6885, 0.2787], [-0.7541, 0.2705]], [[-0.4508, 0.0492], [-0.4672, 0.082], [-0.459, 0.1148], [-0.4344, 0.1148], [-0.4262, 0.0656]], [[-0.9016, 0.0246], [-0.8689, 0.082], [-0.8361, 0.082], [-0.8197, 0.123], [-0.7951, 0.1148], [-0.8852, 0.0164]], [[-1, -0.0574], [-1.0246, 0], [-0.9754, 0.0246], [-0.9426, 0.1475], [-0.8525, 0.2295], [-0.8279, 0.2213], [-0.8361, 0.1721], [-0.9016, 0.1148]], [[0.0492, -0.2049], [0.0164, -0.2049], [-0.0984, -0.0902], [-0.0984, 0.041], [-0.0492, 0.0902], [0.041, 0.0902], [0.1639, -0.0738]], [[-0.6885, -0.6066], [-0.7213, -0.6066], [-0.7049, -0.5328], [-0.6803, -0.5492]], [[-0.7541, -0.7131], [-0.6967, -0.6475], [-0.6803, -0.7131], [-0.6311, -0.7541], [-0.4262, -0.7541], [-0.4262, -0.6803], [-0.4672, -0.6311], [-0.4754, -0.541], [-0.5574, -0.541], [-0.6557, -0.4672], [-0.7869, -0.4672], [-0.7951, -0.4016], [-0.9754, -0.2295], [-0.9426, -0.1967], [-0.9754, -0.123], [-0.959, -0.0984], [-0.9016, -0.0984], [-0.7787, -0.2377], [-0.7459, -0.2295], [-0.7623, -0.1475], [-0.7213, -0.0656], [-0.7541, -0.0328], [-0.6885, -0.0492], [-0.6803, 0.0164], [-0.7377, 0.0656], [-0.7541, 0.1967], [-0.7213, 0.1967], [-0.7295, 0.0902], [-0.6885, 0.082], [-0.6803, 0.0492], [-0.6311, 0.0492], [-0.5656, 0.123], [-0.5082, 0.1475], [-0.5, 0.0984], [-0.5328, 0.0656], [-0.5164, 0.0328], [-0.5984, 0.0164], [-0.6475, -0.0574], [-0.5492, -0.0574], [-0.4262, -0.1803], [-0.4262, -0.4918], [-0.2131, -0.5], [-0.1885, -0.4672], [-0.0984, -0.5902], [-0.0902, -0.6475], [0.0164, -0.6475], [0.123, -0.541], [0.3033, -0.541], [0.3197, -0.5738], [0.3689, -0.5738], [0.418, -0.5246], [0.418, -0.3279], [0.6393, -0.2295], [0.6393, -0.1885], [0.5984, -0.1557], [0.6066, -0.1066], [0.5246, -0.0492], [0.5246, 0], [0.4836, 0.0574], [0.5328, 0.0984], [0.5328, 0.2705], [0.4016, 0.2705], [0.3525, 0.3115], [0.3525, 0.4508], [0.3115, 0.4672], [0.3115, 0.5246], [0.3443, 0.5246], [0.377, 0.459], [0.3852, 0.3197], [0.418, 0.3033], [0.4508, 0.3197], [0.4262, 0.3607], [0.459, 0.377], [0.5574, 0.377], [0.5738, 0.3361], [0.6148, 0.3443], [0.6066, 0.5164], [0.6311, 0.5246], [0.623, 0.3115], [0.6967, 0.3197], [0.7869, 0.1557], [0.8197, 0.1639], [0.8279, 0.2295], [0.8607, 0.2377], [0.8607, 0.4098], [0.9016, 0.4262], [0.8115, 0.5164], [0.8525, 0.5246], [0.8525, 0.5], [0.9262, 0.4426], [0.9098, 0.3934], [0.959, 0.4098], [0.9344, 0.3361], [1, 0.3197], [0.9672, 0.2869], [0.959, 0.3279], [0.9262, 0.3115], [0.9262, 0.2131], [0.8934, 0.2131], [0.877, 0.1721], [0.8852, 0.1393], [0.959, 0.1393], [0.8934, 0.1393], [0.8607, 0.0574], [0.8934, 0.0492], [0.9262, -0.0574], [0.9836, -0.1148], [0.959, -0.1721], [0.9836, -0.1885], [1, -0.2951], [0.959, -0.3279], [0.9672, -0.377], [0.918, -0.4262], [0.8607, -0.4262], [0.8115, -0.5], [0.7131, -0.5492], [0.7131, -0.6393], [0.6721, -0.6639], [0.6803, -0.7459], [0.5574, -0.8689], [0.4344, -0.8689], [0.418, -0.9016], [0.3525, -0.9016], [0.3361, -0.8689], [0.2213, -0.8689], [0.1475, -0.9426], [0.0984, -0.9426], [0.0328, -1.0246], [-0.1557, -1.0082], [-0.2049, -0.9344], [-0.2623, -0.9344], [-0.3115, -0.8852], [-0.3197, -0.8279], [-0.5328, -0.8279], [-0.5492, -0.7951], [-0.6721, -0.7951]], [[0.6475, -0.0902], [0.7459, -82e-4], [0.7459, 0.1639], [0.6803, 0.1639], [0.6393, 0.1148], [0.6393, 0.0246], [0.6066, -0.0164], [0.6393, -0.041]], [[0.7541, -0.4508], [0.8852, -0.3934], [0.9344, -0.3197], [0.9262, -0.1311], [0.8033, -0.1311], [0.7131, -0.2213], [0.7131, -0.2705], [0.7459, -0.2869]], [[-0.5246, -0.4672], [-0.5, -0.418], [-0.5, -0.2951], [-0.6393, -0.1639], [-0.6885, -0.2377], [-0.6803, -0.3033], [-0.7213, -0.3361], [-0.7213, -0.3852], [-0.6066, -0.459]], [[0.4754, -0.541], [0.6393, -0.5328], [0.6721, -0.4918], [0.6639, -0.2869], [0.6311, -0.3197], [0.541, -0.3197], [0.459, -0.4016]], [[-0.3115, -0.7623], [-0.1557, -0.7623], [-0.0902, -0.7131], [-0.1639, -0.6393], [-0.2131, -0.541], [-0.3033, -0.541], [-0.3279, -0.5738], [-0.3934, -0.582], [-0.3525, -0.623]], [[0.0164, -0.7131], [0.1148, -0.7623], [0.1311, -0.7951], [0.2295, -0.8033], [0.3033, -0.7213], [0.3443, -0.623], [0.1721, -0.5738], [0.1148, -0.6475], [0.0574, -0.6475]], [[0.3115, -0.8197], [0.5246, -0.8279], [0.6393, -0.7049], [0.623, -0.6557], [0.6639, -0.582], [0.582, -0.5738], [0.5492, -0.6148], [0.4262, -0.6148], [0.377, -0.6557], [0.377, -0.7213], [0.3115, -0.7623]], [[-0.2787, -0.7951], [-0.2541, -0.8689], [-0.1066, -0.9836], [-0.0246, -0.9836], [-0.0164, -0.9508], [0.123, -0.9098], [0.1639, -0.8607], [0.1557, -0.8279], [0.0246, -0.7951], [82e-4, -0.7541], [-0.1311, -0.7541], [-0.1393, -0.7869]]];

// src/lib/motion-core/particle-texture-motion.mjs
var MOTION_MODELS = [{ "panel": 0, "degree": 3, "coefficients": [[0.2053605, -0.0566767, 0.0318523, 0.0756725], [0.9849805, 18106e-7, 4.3941951, 0.6321306], [0.1371605, 0.2202684, -0.1923895, 0.3779279], [0.3548565, 0.076812, 3.8821299, 0.010771], [0.4604071, -0.5365284, 0.1180278, -3.4599472], [1.3113152, 1.3997841, -2.8288907, 1.7089339], [0.9113102, -0.94894, 0.2340842, -6.3357142], [0.5876358, 0.7071123, -1.4882885, 0.7584246], [0.3343655, -0.1281577, 0.0678485, -0.1877863], [2.2029191, -0.2677455, 8.6269182, 1.7163766], [0.1466911, 0.8367901, -0.8664258, 0.0989993], [-0.3125435, 0.212363, 0.2085956, -0.1671613], [0.1711934, -0.4212441, 0.0192292, -3.6032016], [0.8612298, 1.0156581, -1.7572275, 1.1621705], [-0.5515353, 0.2419227, -0.3259837, -0.4300602], [0.1162758, -0.0871212, 0.2553563, 0.1520531]] }, { "panel": 2, "degree": 3, "coefficients": [[-5793e-7, 0.0546261, -0.1742701, -0.0165313], [-0.2700798, -0.9394791, 1.5163232, -0.7754947], [0.0688178, 0.0341665, -0.1642915, 0.1088199], [-0.1323715, -0.3209199, 0.47855, -0.3400926], [0.0209537, -1.0941738, 1.6375274, -0.2544367], [5.0164373, -0.723406, 1.7872972, 7.9000531], [-0.0101027, -1.3446404, 2.0361803, -0.3574182], [1.9397867, -0.2873762, 0.7128157, 3.0459854], [-0.0315157, 0.0793237, -0.2409735, -0.0671648], [-0.333701, -1.2599792, 2.0564616, -0.9262866], [0.2734882, 0.0260207, -0.1339108, 0.4617671], [-0.1313261, -0.1927781, 0.2809815, -0.3280232], [-0.0219838, -0.4550386, 0.6836198, -0.1610577], [2.0508225, -0.3036841, 0.7283039, 3.2378267], [0.0147459, -0.2250745, 0.29264, -0.0932053], [0.5144863, -0.0764196, 0.2045949, 0.7804547]] }];

// src/lib/motion-core/particle-texture-renderer.mjs
var TAU = Math.PI * 2;
var clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
var mix = (a, b, t) => a + (b - a) * t;
var fract = (v) => v - Math.floor(v);
var centers = [182.5, 480, 779.5];
var lattice = Float32Array.from({ length: 4096 }, (_, i) => fract(Math.sin(i % 64 * 127.1 + Math.floor(i / 64) * 311.7) * 43758.5453));
function noise(x, y) {
  const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy, u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const at = (dx, dy) => lattice[(iy + dy & 63) * 64 + (ix + dx & 63)];
  return mix(mix(at(0, 0), at(1, 0), u), mix(at(0, 1), at(1, 1), u), v);
}
function boundary(x, y, index) {
  const square = index === 2 ? 0.6 : 0.74, circle = index === 2 ? 0.42 : 0.44, offset = 1 - circle;
  return Math.min(
    Math.max(Math.abs(x), Math.abs(y)) - square,
    Math.hypot(x, y - offset) - circle,
    Math.hypot(x, y + offset) - circle,
    Math.hypot(x - offset, y) - circle,
    Math.hypot(x + offset, y) - circle,
    index === 2 ? 10 : (Math.abs(x) + Math.abs(y) - 1.02) / Math.SQRT2
  );
}
function contourDistance(x, y) {
  let inside = false, distance = 10;
  for (const polygon of WHITE_CONTOURS) for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [ax, ay] = polygon[j], [bx, by] = polygon[i], vx = bx - ax, vy = by - ay;
    if (ay > y !== by > y && x < (bx - ax) * (y - ay) / (by - ay) + ax) inside = !inside;
    const t = clamp(((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy));
    distance = Math.min(distance, Math.hypot(x - ax - vx * t, y - ay - vy * t));
  }
  return inside ? distance : -distance;
}
function particleMotionCoefficients(x, y, index, seed) {
  if (index === 1) {
    const amplitude = 0.08 + 0.42 * seed, phase = seed * TAU;
    return [amplitude * Math.cos(phase), 0, amplitude * Math.sin(phase), 0];
  }
  const model = MOTION_MODELS.find((value) => value.panel === index), tx = [1, x], ty = [1, y], coefficients = [0, 0, 0, 0];
  for (let i = 2; i <= model.degree; i++) {
    tx.push(2 * x * tx[i - 1] - tx[i - 2]);
    ty.push(2 * y * ty[i - 1] - ty[i - 2]);
  }
  for (let i = 0; i <= model.degree; i++) for (let j = 0; j <= model.degree; j++) {
    const weight = tx[i] * ty[j], row = model.coefficients[i * (model.degree + 1) + j];
    for (let k = 0; k < 4; k++) coefficients[k] += row[k] * weight;
  }
  return coefficients;
}
function makePoints() {
  return centers.map((_, index) => {
    const dots = [];
    for (let row = -27; row <= 27; row++) for (let col = -27; col <= 27; col++) {
      const x = col * 4.485 / 122, y = row * 4.485 / 122, edge = boundary(x, y, index);
      if (edge > 0.012) continue;
      const white = index === 1 ? clamp(0.5 + contourDistance(x, y) / 0.022) : 1;
      if (white === 0) continue;
      const seed = fract(Math.sin(col * 127.1 + row * 311.7 + index * 74.7) * 43758.5453);
      dots.push({ x, y, edge, white, seed, motion: particleMotionCoefficients(x, y, index, seed) });
    }
    return dots;
  });
}
var palettes = [
  [[130, 179, 5], [144, 190, 18], [182, 205, 170], [180, 192, 244]],
  [[255, 255, 255], [255, 255, 255], [255, 255, 255], [255, 255, 255]],
  [[218, 148, 77], [204, 95, 95], [185, 31, 80], [155, 3, 59]]
];
function makeColors() {
  return palettes.map((stops) => Array.from({ length: 48 }, (_, i) => {
    const t = i / 47 * 3, k = Math.min(2, Math.floor(t)), f = t - k;
    return stops[k].map((v, j) => Math.round(mix(v, stops[k + 1][j], f)));
  }));
}
var points = makePoints();
var colors = makeColors();
function drawParticleTextures(ctx, time, { background = "#000" } = {}) {
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 960, 540);
  const phase = time % 3 * TAU / 3, cos = Math.cos(phase), sin = Math.sin(phase), lightBackground = background === "#f4f4f4";
  for (let index = 0; index < 3; index++) {
    const buckets = Array.from({ length: 48 * 16 }, () => []);
    for (const p of points[index]) {
      const { x, y, seed } = p;
      const nx = x * 5.2 + 0.65 * cos, ny = y * 5.2 + 0.65 * sin;
      const coarse = noise(nx + index * 11, ny + index * 7), fine = noise(nx * 2.5 + 9, ny * 2.5 + 19);
      const sparkle = 0.5 + 0.5 * Math.sin(seed * TAU + phase * 2);
      const dx = p.motion[0] * cos + p.motion[2] * sin, dy = p.motion[1] * cos + p.motion[3] * sin;
      let radius, brightness, hue;
      if (index === 0) {
        const ridge = 0.5 + 0.5 * Math.sin(coarse * 17 + fine * 5 + phase), energy = 0.45 * ridge + 0.55 * sparkle;
        radius = 0.75 + 1.55 * energy;
        brightness = 0.62 + 0.38 * energy;
        const sweep = Math.exp(-(((y - (0.38 + 0.23 * Math.sin(phase) - 0.2 * Math.sin(x * 3 + phase))) / 0.33) ** 2));
        hue = clamp((y + 1) / 2 + 0.14 * (coarse - 0.5) + 0.09 * sweep);
        radius = (radius + 0.2 * sweep) * 0.93;
      } else if (index === 1) {
        radius = (0.8 + 0.49 * coarse + 0.33 * sparkle) * Math.sqrt(p.white);
        brightness = clamp(0.28 + 0.85 * noise(x * 3 + cos, y * 3 + sin + 43) + 0.25 * Math.max(0, -y)) * p.white;
        if (Math.hypot(x, y) < 0.15) brightness = 0.95 * p.white;
        hue = 0;
      } else {
        const rim = Math.exp(-Math.abs(p.edge) * 33);
        const ridge = 0.5 + 0.5 * Math.sin(coarse * 17 + fine * 5 + phase), energy = 0.45 * ridge + 0.55 * sparkle;
        radius = 0.75 + 1.55 * energy;
        brightness = 0.48 + 0.52 * energy;
        hue = clamp((y + 1) / 2 + 0.07 * (coarse - 0.5));
        if (y > 0.12 && rim > 0.42) hue = 0.05 + 0.26 * (1 - rim);
      }
      const px = centers[index] + x * 122 + dx, py = 270 + y * 122 + dy;
      const shade = Math.round(clamp(brightness) * 15), color = Math.round(hue * 47);
      buckets[color * 16 + shade].push(px, py, radius);
    }
    for (let i = 0; i < buckets.length; i++) {
      const dots = buckets[i];
      if (!dots.length) continue;
      const c = index === 1 && lightBackground ? [38, 38, 38] : colors[index][Math.floor(i / 16)], brightness = i % 16 / 15;
      const glint = index !== 1 && Math.floor(i / 16) > 18 ? Math.max(0, (brightness - 0.85) / 0.15) ** 2 * 0.24 : 0;
      ctx.fillStyle = `rgb(${c.map((v) => {
        const lit = mix(v, 255, glint);
        return Math.round(lightBackground ? mix(244, lit, brightness) : lit * brightness);
      }).join(",")})`;
      ctx.beginPath();
      for (let j = 0; j < dots.length; j += 3) {
        ctx.moveTo(dots[j] + dots[j + 2], dots[j + 1]);
        ctx.arc(dots[j], dots[j + 1], dots[j + 2], 0, TAU);
      }
      ctx.fill();
    }
  }
}

// src/lib/motion-core/particle-texture-trio.mjs
function createParticleTextureTrio(target, initial, css, markup) {
  const surface = createSurface(target, { css, markup, width: 960, height: 540 }, initial);
  const { root, element, on } = surface, scene = root.querySelector(".pt-scene"), stage = root.querySelector(".pt-stage"), canvas = root.querySelector("canvas");
  const ctx = canvas.getContext("2d", { alpha: false }), buttons = [...root.querySelectorAll(".pt-target")], status = root.querySelector(".pt-status");
  const owner = target.ownerDocument, browser = owner.defaultView, media = browser.matchMedia("(prefers-reduced-motion: reduce)");
  let options = { ...initial }, time = 0, last = 0, frame = 0, visible = true, destroyed = false, density = 0, frameInterval = 1e3 / 60, embeddedWidth = Infinity;
  let paused = Boolean(initial.paused);
  const reduced = () => options.reducedMotion ?? media.matches;
  function draw() {
    const width = Math.min(canvas.getBoundingClientRect().width, embeddedWidth);
    const dpr = Math.max(0.35, Math.min(2, width / 960 * (browser.devicePixelRatio || 1)));
    frameInterval = width < 500 ? 1e3 / 30 : 1e3 / 60;
    if (Math.abs(dpr - density) > 0.01) {
      density = dpr;
      canvas.width = Math.round(960 * dpr);
      canvas.height = Math.round(540 * dpr);
    }
    ctx.setTransform(density, 0, 0, density, 0, 0);
    drawParticleTextures(ctx, time, { background: options.background ?? "#000" });
    scene.dataset.time = time.toFixed(4);
    scene.dataset.paused = String(paused);
    scene.dataset.motion = reduced() ? "reduced" : "full";
    scene.dataset.ready = "true";
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(paused)));
  }
  function stop() {
    if (frame) browser.cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
  }
  function tick(now) {
    frame = 0;
    if (destroyed || paused || reduced() || !visible || owner.hidden || options.speed === 0) return;
    if (!last) last = now;
    if (now - last >= frameInterval - 0.5) {
      time += Math.min((now - last) / 1e3, 0.1) * options.speed;
      last = now;
      draw();
    }
    frame = browser.requestAnimationFrame(tick);
  }
  function wake() {
    if (!frame && !destroyed && !paused && !reduced() && visible && !owner.hidden && options.speed > 0) frame = browser.requestAnimationFrame(tick);
  }
  function sync() {
    stop();
    draw();
    wake();
  }
  function reset() {
    time = 0;
    paused = false;
    status.textContent = "Animation restarted";
    sync();
  }
  buttons.forEach((button) => {
    on(button, "click", () => {
      paused = !paused;
      status.textContent = paused ? "Animation paused" : "Animation playing";
      sync();
    });
    on(button, "keydown", (event) => {
      if (event.key === "Home" || event.key === "Escape") {
        event.preventDefault();
        reset();
      }
      if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        event.preventDefault();
        paused = true;
        time = Math.max(0, time + (event.key === "ArrowRight" ? 1 : -1) / 30);
        status.textContent = "Animation stepped one frame";
        sync();
      }
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        buttons[(buttons.indexOf(button) + (event.key === "ArrowDown" ? 1 : 2)) % 3].focus();
      }
    });
  });
  on(media, "change", sync);
  on(owner, "visibilitychange", () => owner.hidden ? stop() : wake());
  on(browser, "message", (event) => {
    const data = event.data;
    if (event.source !== browser.parent || data?.type !== "solen-render-size" || data.slug !== "particle-texture-trio") return;
    if (typeof data.width !== "number" || !Number.isFinite(data.width) || data.width <= 0 || data.width > 16384) return;
    embeddedWidth = data.width;
    draw();
  });
  const observer = new browser.IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) wake();
    else stop();
  });
  observer.observe(element);
  const resize = new browser.ResizeObserver(() => {
    stage.style.setProperty("--pt-scale", String(Math.min(scene.clientWidth / 960, scene.clientHeight / 540)));
    draw();
  });
  resize.observe(scene);
  function normalize(next) {
    options = { ...options, ...next };
    options.speed = Number.isFinite(options.speed) ? Math.max(0, Math.min(3, options.speed)) : 1;
    if (next.paused !== void 0) paused = Boolean(next.paused);
  }
  normalize(initial);
  draw();
  wake();
  return {
    element,
    root,
    update(next = {}) {
      if (destroyed) return;
      normalize(next);
      surface.controller.update(next);
      sync();
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      stop();
      observer.disconnect();
      resize.disconnect();
      surface.controller.destroy();
      canvas.width = 0;
      canvas.height = 0;
    }
  };
}

// src/lib/motion-core/particle-texture-trio-entry.js
function mountParticleTextureTrio(target, options = {}) {
  return createParticleTextureTrio(target, options, ".pt-scene{position:relative;width:100%;height:var(--motion-height,540px);overflow:hidden;background:var(--pt-background,#000);color:#fff;font-family:Arial,Helvetica,sans-serif}\r\n.pt-stage{position:absolute;left:50%;top:50%;width:960px;height:540px;transform:translate(-50%,-50%) scale(var(--pt-scale,1));transform-origin:center}\r\n.pt-canvas{display:block;width:960px;height:540px}\r\n.pt-target{position:absolute;top:138px;width:264px;height:264px;appearance:none;margin:0;padding:0;border:0;border-radius:0;background:transparent;cursor:pointer;touch-action:pan-y;-webkit-tap-highlight-color:transparent}\r\n.pt-target:nth-of-type(1){left:50.5px}.pt-target:nth-of-type(2){left:348px}.pt-target:nth-of-type(3){left:647.5px}\r\n.pt-target:focus-visible{outline:1px dashed #b9b9b9;outline-offset:5px;border-radius:4px}\r\n.pt-status{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}\r\n", '<main class="pt-scene" aria-label="Three flowing particle textures"><div class="pt-stage"><canvas class="pt-canvas" aria-hidden="true"></canvas><button class="pt-target" type="button" aria-label="Blue and green particles: pause or resume" aria-pressed="false"></button><button class="pt-target" type="button" aria-label="White hollow particles: pause or resume" aria-pressed="false"></button><button class="pt-target" type="button" aria-label="Orange and pink particles: pause or resume" aria-pressed="false"></button></div><span class="pt-status" role="status" aria-live="polite"></span></main>');
}
export {
  mountParticleTextureTrio
};
