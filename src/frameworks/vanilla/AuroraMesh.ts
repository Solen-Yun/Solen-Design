import { mountAuroraMesh, type AuroraMeshOptions } from "../../components/aurora-mesh/AuroraMeshEngine.js";
import type { MotionController } from "../../components/aurora-mesh/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AuroraMeshOptions = {}): ReturnType<typeof mountAuroraMesh> {
  return mountAuroraMesh(target, options);
}
export type { AuroraMeshOptions };
