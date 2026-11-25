// 全屏滚动布局的实演舞台（style-full-scroll.html 专用）：进场错落、
// 场景进度点、滚动提示三件事。舞台是一个固定高度的 scroll-snap 容器，
// 场景进视口时给 .reveal 元素按 80ms 步进（上限 320ms）钉上延迟变量，
// 动画本体交给 CSS；离开视口就撤掉 is-in，滚回来可以重播一遍。

const stage = document.querySelector(".snap-stage");

if (stage) {
  const scenes = [...stage.querySelectorAll(".scene")];
  const dotsBox = stage.querySelector(".scene-dots");
  const cue = stage.querySelector(".scene-cue");
  const cueText = stage.querySelector(".scene-cue-text");

  for (const scene of scenes) {
    scene.querySelectorAll(".reveal").forEach((el, index) => {
      el.style.setProperty("--d", `${Math.min(index * 80, 320)}ms`);
    });
  }

  const dots = scenes.map((scene, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "scene-dot";
    dot.setAttribute("aria-label", `跳到场景 ${index + 1}`);
    dot.addEventListener("click", () => scene.scrollIntoView({ behavior: "smooth" }));
    dotsBox.append(dot);
    return dot;
  });

  const setActive = (index) => {
    dots.forEach((dot, i) => dot.classList.toggle("is-on", i === index));
    const last = index === scenes.length - 1;
    if (cueText) cueText.textContent = last ? "回到顶部" : "继续滚动";
    cue.dataset.last = String(last);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle("is-in", entry.isIntersecting);
        if (entry.isIntersecting) setActive(scenes.indexOf(entry.target));
      }
    },
    { root: stage, threshold: 0.55 },
  );
  scenes.forEach((scene) => observer.observe(scene));

  cue.addEventListener("click", () => {
    const index = dots.findIndex((dot) => dot.classList.contains("is-on"));
    const target = index === scenes.length - 1 ? scenes[0] : scenes[index + 1];
    target.scrollIntoView({ behavior: "smooth" });
  });
}
