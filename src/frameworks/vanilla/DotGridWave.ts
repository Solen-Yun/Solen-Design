import { mountDotGridWave, type DotGridWaveOptions } from "../../components/dot-grid-wave/DotGridWaveEngine.js";
import type { MotionController } from "../../components/dot-grid-wave/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: DotGridWaveOptions = {}): ReturnType<typeof mountDotGridWave> {
  return mountDotGridWave(target, options);
}
export type { DotGridWaveOptions };
