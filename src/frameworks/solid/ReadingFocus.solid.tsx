/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountReadingFocus, type ReadingFocusOptions } from "../../components/reading-focus/ReadingFocusEngine.js";
import type { MotionController } from "../../components/reading-focus/motion-runtime";

export function ReadingFocus(props: { options?: ReadingFocusOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountReadingFocus(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="reading-focus" />;
}
