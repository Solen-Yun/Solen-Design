import { mountCollectionLayoutMorph, type CollectionLayoutMorphOptions } from "../../components/collection-layout-morph/CollectionLayoutMorphEngine.js";
import type { MotionController } from "../../components/collection-layout-morph/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: CollectionLayoutMorphOptions = {}): ReturnType<typeof mountCollectionLayoutMorph> {
  return mountCollectionLayoutMorph(target, options);
}
export type { CollectionLayoutMorphOptions };
