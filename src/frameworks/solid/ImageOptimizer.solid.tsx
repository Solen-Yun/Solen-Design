/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountImageOptimizer, type ImageOptimizerOptions } from "../../components/image-optimizer/ImageOptimizerEngine.js";
import type { MotionController } from "../../components/image-optimizer/motion-runtime";

export function ImageOptimizer(props: { options?: ImageOptimizerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountImageOptimizer(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="image-optimizer" />;
}
