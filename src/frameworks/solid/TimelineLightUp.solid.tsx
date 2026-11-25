/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTimelineLightUp, type TimelineLightUpOptions } from "../../components/timeline-light-up/TimelineLightUpEngine.js";
import type { MotionController } from "../../components/timeline-light-up/motion-runtime";

export function TimelineLightUp(props: { options?: TimelineLightUpOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTimelineLightUp(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="timeline-light-up" />;
}
