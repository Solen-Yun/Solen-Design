/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountWordFillParagraph, type WordFillParagraphOptions } from "../../components/word-fill-paragraph/WordFillParagraphEngine.js";
import type { MotionController } from "../../components/word-fill-paragraph/motion-runtime";

export function WordFillParagraph(props: { options?: WordFillParagraphOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountWordFillParagraph(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="word-fill-paragraph" />;
}
