/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStreakFlame, type StreakFlameOptions } from "../../components/streak-flame/StreakFlameEngine.js";
import type { MotionController } from "../../components/streak-flame/motion-runtime";

export function StreakFlame(props: { options?: StreakFlameOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStreakFlame(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="streak-flame" />;
}
