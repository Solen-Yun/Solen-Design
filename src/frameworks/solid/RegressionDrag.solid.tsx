/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountRegressionDrag, type RegressionDragOptions } from "../../components/regression-drag/RegressionDragEngine.js";
import type { MotionController } from "../../components/regression-drag/motion-runtime";

export function RegressionDrag(props: { options?: RegressionDragOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountRegressionDrag(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="regression-drag" />;
}
