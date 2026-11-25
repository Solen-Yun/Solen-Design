/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountPlatformDownload, type PlatformDownloadOptions } from "../../components/platform-download/PlatformDownloadEngine.js";
import type { MotionController } from "../../components/platform-download/motion-runtime";

export function PlatformDownload(props: { options?: PlatformDownloadOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountPlatformDownload(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="platform-download" />;
}
