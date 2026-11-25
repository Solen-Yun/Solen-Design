/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountFoldedEmojiScroll, type FoldedEmojiScrollOptions } from "../../components/folded-emoji-scroll/FoldedEmojiScrollEngine.js";
import type { MotionController } from "../../components/folded-emoji-scroll/motion-runtime";

export function FoldedEmojiScroll(props: { options?: FoldedEmojiScrollOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountFoldedEmojiScroll(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="folded-emoji-scroll" />;
}
