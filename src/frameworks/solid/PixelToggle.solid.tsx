/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPixelToggle, type PixelToggleOptions } from "../../components/pixel-toggle/PixelToggleEngine.js";
import type { MotionController } from "../../components/pixel-toggle/motion-runtime";

export function PixelToggle(props: { options?: PixelToggleOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPixelToggle(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="pixel-toggle" />;
}
