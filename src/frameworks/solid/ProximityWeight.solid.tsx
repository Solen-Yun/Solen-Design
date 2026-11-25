/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountProximityWeight, type ProximityWeightOptions } from "../../components/proximity-weight/ProximityWeightEngine.js";
import type { MotionController } from "../../components/proximity-weight/motion-runtime";

export function ProximityWeight(props: { options?: ProximityWeightOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountProximityWeight(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="proximity-weight" />;
}
