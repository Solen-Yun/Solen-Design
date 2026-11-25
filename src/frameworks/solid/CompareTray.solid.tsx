/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCompareTray, type CompareTrayOptions } from "../../components/compare-tray/CompareTrayEngine.js";
import type { MotionController } from "../../components/compare-tray/motion-runtime";

export function CompareTray(props: { options?: CompareTrayOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCompareTray(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="compare-tray" />;
}
