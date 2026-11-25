/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountShimmerGradientText, type ShimmerGradientTextOptions } from "../../components/shimmer-gradient-text/ShimmerGradientTextEngine.js";
import type { MotionController } from "../../components/shimmer-gradient-text/motion-runtime";

export function ShimmerGradientText(props: { options?: ShimmerGradientTextOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountShimmerGradientText(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="shimmer-gradient-text" />;
}
