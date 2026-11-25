/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTodayPopup, type TodayPopupOptions } from "../../components/today-popup/TodayPopupEngine.js";
import type { MotionController } from "../../components/today-popup/motion-runtime";

export function TodayPopup(props: { options?: TodayPopupOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTodayPopup(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="today-popup" />;
}
