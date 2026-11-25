import { useEffect, useRef, useState } from "react";

/* The stage is a fixed frame; a scene larger than it is scaled down as one
   unit so it stays inside, keeps its proportions, and nothing is cropped.

   The scene's own backdrop is dropped here: the workbench background is
   what shows through, so a component is never presented as a coloured
   panel inside a bigger panel. Both layers are cleared - the scene root
   (the first child of .motion-body) and .motion-body itself, which is
   where the runtime rewrites an `html,body{background:...}` rule. The
   backdrop lives inside the component's shadow root, so the rule is
   injected there; the component keeps its own colours for real use. */
const SCENE_RULE =
  ".motion-body, .motion-body > *:first-child { background: transparent !important; }";

function clearSceneBackdrop(root) {
  for (const host of root.querySelectorAll("[data-motion-surface]")) {
    const shadow = host.shadowRoot;
    if (!shadow) continue;
    for (const style of shadow.querySelectorAll("style[data-docs-backdrop]")) style.remove();
    const style = host.ownerDocument.createElement("style");
    style.dataset.docsBackdrop = "true";
    style.textContent = SCENE_RULE;
    shadow.appendChild(style);
  }
}

export function DemoFit({ children }) {
  const box = useRef(null);
  const inner = useRef(null);
  const [fit, setFit] = useState({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    const measure = () => {
      const frame = box.current;
      const scene = inner.current;
      if (!frame || !scene) return;
      const boxW = frame.clientWidth;
      const boxH = frame.clientHeight;
      const sceneW = scene.offsetWidth;
      const sceneH = scene.offsetHeight;
      if (!boxW || !boxH || !sceneW || !sceneH) return;
      const scale = Math.min(1, boxW / sceneW, boxH / sceneH);
      setFit({
        scale,
        x: (boxW - sceneW * scale) / 2,
        y: (boxH - sceneH * scale) / 2,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (box.current) observer.observe(box.current);
    if (inner.current) observer.observe(inner.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const scene = inner.current;
    if (!scene) return undefined;
    clearSceneBackdrop(scene);
    const observer = new MutationObserver(() => clearSceneBackdrop(scene));
    observer.observe(scene, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="demo-fit" ref={box}>
      <div
        className="demo-fit-inner"
        ref={inner}
        style={{ transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

/* Gallery companion for responsive scenes: a fluid 1200px-wide scene collapses
   into its mobile layout inside a ~210px card, so it must render at its design
   width and be scaled down as one unit instead. The card's height follows the
   scaled scene. */
export function SceneFit({ width, height, children }) {
  const box = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const measure = () => setScale((box.current?.clientWidth ?? width) / width);
    measure();
    const observer = new ResizeObserver(measure);
    if (box.current) observer.observe(box.current);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={box} style={{ height: `${height * scale}px`, overflow: "hidden" }}>
      <div style={{ width: `${width}px`, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}
