/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBoundingBoxResize, type BoundingBoxResizeOptions } from "../../components/bounding-box-resize/BoundingBoxResizeEngine.js";
import type { MotionController } from "../../components/bounding-box-resize/motion-runtime";

export function BoundingBoxResize(props: { options?: BoundingBoxResizeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBoundingBoxResize(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="bounding-box-resize" />;
}
