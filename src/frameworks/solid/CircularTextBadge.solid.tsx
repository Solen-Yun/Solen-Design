/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCircularTextBadge, type CircularTextBadgeOptions } from "../../components/circular-text-badge/CircularTextBadgeEngine.js";
import type { MotionController } from "../../components/circular-text-badge/motion-runtime";

export function CircularTextBadge(props: { options?: CircularTextBadgeOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCircularTextBadge(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="circular-text-badge" />;
}
