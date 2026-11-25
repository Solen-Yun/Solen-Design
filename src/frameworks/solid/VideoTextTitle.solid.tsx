/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountVideoTextTitle, type VideoTextTitleOptions } from "../../components/video-text-title/VideoTextTitleEngine.js";
import type { MotionController } from "../../components/video-text-title/motion-runtime";

export function VideoTextTitle(props: { options?: VideoTextTitleOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountVideoTextTitle(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="video-text-title" />;
}
