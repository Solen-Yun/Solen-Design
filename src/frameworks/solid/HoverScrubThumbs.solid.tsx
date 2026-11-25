/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountHoverScrubThumbs, type HoverScrubThumbsOptions } from "../../components/hover-scrub-thumbs/HoverScrubThumbsEngine.js";
import type { MotionController } from "../../components/hover-scrub-thumbs/motion-runtime";

export function HoverScrubThumbs(props: { options?: HoverScrubThumbsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountHoverScrubThumbs(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="hover-scrub-thumbs" />;
}
