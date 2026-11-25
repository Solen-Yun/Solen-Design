/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountTypeToDelete, type TypeToDeleteOptions } from "../../components/type-to-delete/TypeToDeleteEngine.js";
import type { MotionController } from "../../components/type-to-delete/motion-runtime";

export function TypeToDelete(props: { options?: TypeToDeleteOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountTypeToDelete(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="type-to-delete" />;
}
