/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMultiCursorBuilder, type MultiCursorBuilderOptions } from "../../components/multi-cursor-builder/MultiCursorBuilderEngine.js";
import type { MotionController } from "../../components/multi-cursor-builder/motion-runtime";

export function MultiCursorBuilder(props: { options?: MultiCursorBuilderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMultiCursorBuilder(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="multi-cursor-builder" />;
}
