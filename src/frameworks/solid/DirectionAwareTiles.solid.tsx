/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountDirectionAwareTiles, type DirectionAwareTilesOptions } from "../../components/direction-aware-tiles/DirectionAwareTilesEngine.js";
import type { MotionController } from "../../components/direction-aware-tiles/motion-runtime";

export function DirectionAwareTiles(props: { options?: DirectionAwareTilesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountDirectionAwareTiles(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="direction-aware-tiles" />;
}
