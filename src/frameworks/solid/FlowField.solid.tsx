/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFlowField, type FlowFieldOptions } from "../../components/flow-field/FlowFieldEngine.js";
import type { MotionController } from "../../components/flow-field/motion-runtime";

export function FlowField(props: { options?: FlowFieldOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFlowField(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="flow-field" />;
}
