/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountVelocityFocusDrag, type VelocityFocusDragOptions } from "../../components/velocity-drag/VelocityFocusDragEngine.js";
import type { MotionController } from "../../components/velocity-drag/motion-runtime";

export function VelocityFocusDrag(props: { options?: VelocityFocusDragOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountVelocityFocusDrag(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="velocity-drag" />;
}
