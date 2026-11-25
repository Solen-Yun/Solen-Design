/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSoftActionWheel, type SoftActionWheelOptions } from "../../components/soft-action-wheel/SoftActionWheelEngine.js";
import type { MotionController } from "../../components/soft-action-wheel/motion-runtime";

export function SoftActionWheel(props: { options?: SoftActionWheelOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSoftActionWheel(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="soft-action-wheel" />;
}
