/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountNotesTextColor, type NotesTextColorOptions } from "../../components/notes-text-color/NotesTextColorEngine.js";
import type { MotionController } from "../../components/notes-text-color/motion-runtime";

export function NotesTextColor(props: { options?: NotesTextColorOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountNotesTextColor(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="notes-text-color" />;
}
