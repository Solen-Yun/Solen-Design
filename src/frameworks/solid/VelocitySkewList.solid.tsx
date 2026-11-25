/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountVelocitySkewList, type VelocitySkewListOptions } from "../../components/velocity-skew-list/VelocitySkewListEngine.js";
import type { MotionController } from "../../components/velocity-skew-list/motion-runtime";

export function VelocitySkewList(props: { options?: VelocitySkewListOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountVelocitySkewList(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="velocity-skew-list" />;
}
