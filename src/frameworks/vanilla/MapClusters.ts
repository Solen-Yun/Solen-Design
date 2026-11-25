import { mountMapClusters, type MapClustersOptions } from "../../components/map-clusters/MapClustersEngine.js";
import type { MotionController } from "../../components/map-clusters/motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: MapClustersOptions = {}): ReturnType<typeof mountMapClusters> {
  return mountMapClusters(target, options);
}
export type { MapClustersOptions };
