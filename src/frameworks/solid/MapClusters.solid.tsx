/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMapClusters, type MapClustersOptions } from "../../components/map-clusters/MapClustersEngine.js";
import type { MotionController } from "../../components/map-clusters/motion-runtime";

export function MapClusters(props: { options?: MapClustersOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMapClusters(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="map-clusters" />;
}
