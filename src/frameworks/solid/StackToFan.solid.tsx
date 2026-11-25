/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStackToFan, type StackToFanOptions } from "../../components/stack-to-fan/StackToFanEngine.js";
import type { MotionController } from "../../components/stack-to-fan/motion-runtime";

export function StackToFan(props: { options?: StackToFanOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStackToFan(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="stack-to-fan" />;
}
