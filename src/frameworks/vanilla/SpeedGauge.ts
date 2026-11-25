import { mountSpeedGauge, type SpeedGaugeOptions } from "../../components/speed-gauge/SpeedGaugeEngine.js";
import type { MotionController } from "../../components/speed-gauge/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: SpeedGaugeOptions = {}): ReturnType<typeof mountSpeedGauge> {
  return mountSpeedGauge(target, options);
}
export type { SpeedGaugeOptions };
