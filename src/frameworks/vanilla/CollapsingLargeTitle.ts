import { mountCollapsingLargeTitle, type CollapsingLargeTitleOptions } from "../../components/collapsing-large-title/CollapsingLargeTitleEngine.js";
import type { MotionController } from "../../components/collapsing-large-title/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CollapsingLargeTitleOptions = {}): ReturnType<typeof mountCollapsingLargeTitle> {
  return mountCollapsingLargeTitle(target, options);
}
export type { CollapsingLargeTitleOptions };
