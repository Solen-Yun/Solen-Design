/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountInlineTextMorph, type InlineTextMorphOptions } from "../../components/inline-text-morph/InlineTextMorphEngine.js";
import type { MotionController } from "../../components/inline-text-morph/motion-runtime";

export function InlineTextMorph(props: { options?: InlineTextMorphOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountInlineTextMorph(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="inline-text-morph" />;
}
