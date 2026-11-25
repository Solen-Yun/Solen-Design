import { mountTiltToFlatScreen, type TiltToFlatScreenOptions } from "../../components/tilt-to-flat-screen/TiltToFlatScreenEngine.js";
import type { MotionController } from "../../components/tilt-to-flat-screen/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: TiltToFlatScreenOptions = {}): ReturnType<typeof mountTiltToFlatScreen> {
  return mountTiltToFlatScreen(target, options);
}
export type { TiltToFlatScreenOptions };
