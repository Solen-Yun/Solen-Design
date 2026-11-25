import { mountTileFlipWave, type TileFlipWaveOptions } from "../../components/tile-flip-wave/TileFlipWaveEngine.js";
import type { MotionController } from "../../components/tile-flip-wave/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TileFlipWaveOptions = {}): ReturnType<typeof mountTileFlipWave> {
  return mountTileFlipWave(target, options);
}
export type { TileFlipWaveOptions };
