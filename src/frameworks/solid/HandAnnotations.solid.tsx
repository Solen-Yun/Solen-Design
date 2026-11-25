/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountHandAnnotations, type HandAnnotationsOptions } from "../../components/hand-annotations/HandAnnotationsEngine.js";
import type { MotionController } from "../../components/hand-annotations/motion-runtime";

export function HandAnnotations(props: { options?: HandAnnotationsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountHandAnnotations(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="hand-annotations" />;
}
