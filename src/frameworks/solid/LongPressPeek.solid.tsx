/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLongPressPeek, type LongPressPeekOptions } from "../../components/long-press-peek/LongPressPeekEngine.js";
import type { MotionController } from "../../components/long-press-peek/motion-runtime";

export function LongPressPeek(props: { options?: LongPressPeekOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLongPressPeek(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="long-press-peek" />;
}
