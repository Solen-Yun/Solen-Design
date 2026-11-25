import { mountExplodedAssembly, type ExplodedAssemblyOptions } from "../../components/exploded-assembly/ExplodedAssemblyEngine.js";
import type { MotionController } from "../../components/exploded-assembly/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ExplodedAssemblyOptions = {}): ReturnType<typeof mountExplodedAssembly> {
  return mountExplodedAssembly(target, options);
}
export type { ExplodedAssemblyOptions };
