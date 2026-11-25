/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountWaitlistPosition, type WaitlistPositionOptions } from "../../components/waitlist-position/WaitlistPositionEngine.js";
import type { MotionController } from "../../components/waitlist-position/motion-runtime";

export function WaitlistPosition(props: { options?: WaitlistPositionOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountWaitlistPosition(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="waitlist-position" />;
}
