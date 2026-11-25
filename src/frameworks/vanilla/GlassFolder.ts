import { mountGlassFolder, type GlassFolderOptions } from "../../components/glass-folder/GlassFolderEngine.js";
import type { MotionController } from "../../components/glass-folder/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GlassFolderOptions = {}): ReturnType<typeof mountGlassFolder> {
  return mountGlassFolder(target, options);
}
export type { GlassFolderOptions };
