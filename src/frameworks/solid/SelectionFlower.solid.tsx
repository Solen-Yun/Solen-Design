/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSelectionFlower, type SelectionFlowerOptions } from "../../components/selection-flower/SelectionFlowerEngine.js";
import type { MotionController } from "../../components/selection-flower/motion-runtime";

export function SelectionFlower(props: { options?: SelectionFlowerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSelectionFlower(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="selection-flower" />;
}
