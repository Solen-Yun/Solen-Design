/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountUnderlineStyles, type UnderlineStylesOptions } from "../../components/underline-styles/UnderlineStylesEngine.js";
import type { MotionController } from "../../components/underline-styles/motion-runtime";

export function UnderlineStyles(props: { options?: UnderlineStylesOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountUnderlineStyles(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="underline-styles" />;
}
