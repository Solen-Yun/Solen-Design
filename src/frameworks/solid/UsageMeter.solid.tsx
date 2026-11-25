/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountUsageMeter, type UsageMeterOptions } from "../../components/usage-meter/UsageMeterEngine.js";
import type { MotionController } from "../../components/usage-meter/motion-runtime";

export function UsageMeter(props: { options?: UsageMeterOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountUsageMeter(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="usage-meter" />;
}
