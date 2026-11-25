/* Design tokens page — generates previews from the library's custom
   properties, so the page never drifts from the actual token files. */

const semantic = [
  "--sd-canvas", "--sd-surface", "--sd-surface-raised", "--sd-fill",
  "--sd-ink", "--sd-ink-muted",
  "--sd-border", "--sd-border-strong",
  "--sd-accent", "--sd-accent-strong", "--sd-accent-soft", "--sd-on-accent",
  "--sd-success", "--sd-success-text", "--sd-success-soft",
  "--sd-warning", "--sd-warning-text", "--sd-warning-soft",
  "--sd-danger", "--sd-danger-text", "--sd-danger-soft",
  "--sd-info", "--sd-info-text", "--sd-info-soft",
];
const semanticBox = document.getElementById("semantic");
if (semanticBox) {
  for (const name of semantic) {
    const chip = document.createElement("div");
    chip.className = "chip";
    chip.innerHTML = `<div class="c"></div><div class="l">${name.slice(5)}</div>`;
    chip.querySelector(".c").style.background = `var(${name})`;
    chip.title = name;
    semanticBox.append(chip);
  }
}

const ramps = ["gray", "amber", "green", "red", "orange", "blue"];
const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const rampsBox = document.getElementById("ramps");
if (rampsBox) {
  for (const ramp of ramps) {
    const row = document.createElement("div");
    row.className = "ramp";
    row.innerHTML = `<span class="name">--sd-${ramp}</span>`;
    for (const step of steps) {
      const sw = document.createElement("div");
      sw.className = "swatch";
      sw.style.background = `var(--sd-${ramp}-${step})`;
      sw.title = `--sd-${ramp}-${step}`;
      row.append(sw);
    }
    rampsBox.append(row);
  }
}

const sizes = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];
const typeBox = document.getElementById("type-scale");
if (typeBox) {
  for (const s of sizes) {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<span class="label">--sd-font-size-${s}</span>`;
    const sample = document.createElement("span");
    sample.className = "type-sample";
    sample.textContent = "Solen — the sun";
    sample.style.fontSize = `var(--sd-font-size-${s})`;
    sample.style.lineHeight = `var(--sd-leading-${s})`;
    row.append(sample);
    typeBox.append(row);
  }
}

const spaces = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24];
const spaceBox = document.getElementById("spacing");
if (spaceBox) {
  for (const n of spaces) {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `<span class="label">--sd-space-${n}</span>`;
    const bar = document.createElement("div");
    bar.className = "space-bar";
    bar.style.width = `var(--sd-space-${n})`;
    row.append(bar);
    spaceBox.append(row);
  }
}
