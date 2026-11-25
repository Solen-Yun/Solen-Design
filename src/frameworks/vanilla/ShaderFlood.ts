import { mountShaderFlood, type ShaderFloodOptions } from "../../components/shader-flood/ShaderFloodEngine.js";
import type { MotionController } from "../../components/shader-flood/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ShaderFloodOptions = {}): ReturnType<typeof mountShaderFlood> {
  return mountShaderFlood(target, options);
}
export type { ShaderFloodOptions };
