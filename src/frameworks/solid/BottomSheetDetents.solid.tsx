/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountBottomSheetDetents, type BottomSheetDetentsOptions } from "../../components/bottom-sheet-detents/BottomSheetDetentsEngine.js";
import type { MotionController } from "../../components/bottom-sheet-detents/motion-runtime";

export function BottomSheetDetents(props: { options?: BottomSheetDetentsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountBottomSheetDetents(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="bottom-sheet-detents" />;
}
