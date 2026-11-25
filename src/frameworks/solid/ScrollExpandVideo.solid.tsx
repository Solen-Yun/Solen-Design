/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountScrollExpandVideo, type ScrollExpandVideoOptions } from "../../components/scroll-expand-video/ScrollExpandVideoEngine.js";
import type { MotionController } from "../../components/scroll-expand-video/motion-runtime";

export function ScrollExpandVideo(props: { options?: ScrollExpandVideoOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountScrollExpandVideo(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="scroll-expand-video" />;
}
