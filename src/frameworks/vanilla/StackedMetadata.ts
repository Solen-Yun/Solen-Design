import { mountStackedMetadata, type StackedMetadataOptions } from "../../components/stacked-metadata/StackedMetadataEngine.js";
import type { MotionController } from "../../components/stacked-metadata/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: StackedMetadataOptions = {}): ReturnType<typeof mountStackedMetadata> {
  return mountStackedMetadata(target, options);
}
export type { StackedMetadataOptions };
