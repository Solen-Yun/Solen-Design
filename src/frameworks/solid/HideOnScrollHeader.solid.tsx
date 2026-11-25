/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountHideOnScrollHeader, type HideOnScrollHeaderOptions } from "../../components/hide-on-scroll-header/HideOnScrollHeaderEngine.js";
import type { MotionController } from "../../components/hide-on-scroll-header/motion-runtime";

export function HideOnScrollHeader(props: { options?: HideOnScrollHeaderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountHideOnScrollHeader(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="hide-on-scroll-header" />;
}
