import { mountBlockPageBuilder, type BlockPageBuilderOptions } from "../../components/block-page-builder/BlockPageBuilderEngine.js";
import type { MotionController } from "../../components/block-page-builder/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: BlockPageBuilderOptions = {}): ReturnType<typeof mountBlockPageBuilder> {
  return mountBlockPageBuilder(target, options);
}
export type { BlockPageBuilderOptions };
