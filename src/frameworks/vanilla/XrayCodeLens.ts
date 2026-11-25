import { mountXrayCodeLens, type XrayCodeLensOptions } from "../../components/xray-code-lens/XrayCodeLensEngine.js";
import type { MotionController } from "../../components/xray-code-lens/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: XrayCodeLensOptions = {}): ReturnType<typeof mountXrayCodeLens> {
  return mountXrayCodeLens(target, options);
}
export type { XrayCodeLensOptions };
