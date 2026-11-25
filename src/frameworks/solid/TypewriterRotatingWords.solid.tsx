/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTypewriterRotatingWords, type TypewriterRotatingWordsOptions } from "../../components/typewriter-rotating-words/TypewriterRotatingWordsEngine.js";
import type { MotionController } from "../../components/typewriter-rotating-words/motion-runtime";

export function TypewriterRotatingWords(props: { options?: TypewriterRotatingWordsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTypewriterRotatingWords(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="typewriter-rotating-words" />;
}
