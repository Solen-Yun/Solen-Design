/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountClipRevealPhotos, type ClipRevealPhotosOptions } from "../../components/clip-reveal-photos/ClipRevealPhotosEngine.js";
import type { MotionController } from "../../components/clip-reveal-photos/motion-runtime";

export function ClipRevealPhotos(props: { options?: ClipRevealPhotosOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountClipRevealPhotos(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="clip-reveal-photos" />;
}
