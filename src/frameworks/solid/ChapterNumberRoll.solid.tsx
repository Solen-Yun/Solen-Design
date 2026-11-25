/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountChapterNumberRoll, type ChapterNumberRollOptions } from "../../components/chapter-number-roll/ChapterNumberRollEngine.js";
import type { MotionController } from "../../components/chapter-number-roll/motion-runtime";

export function ChapterNumberRoll(props: { options?: ChapterNumberRollOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountChapterNumberRoll(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="chapter-number-roll" />;
}
