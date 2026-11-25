/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMorphingCursor, type MorphingCursorOptions } from "../../components/morphing-cursor/MorphingCursorEngine.js";
import type { MotionController } from "../../components/morphing-cursor/motion-runtime";

export function MorphingCursor(props: { options?: MorphingCursorOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMorphingCursor(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="morphing-cursor" />;
}
