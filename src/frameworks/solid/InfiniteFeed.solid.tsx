/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountInfiniteFeed, type InfiniteFeedOptions } from "../../components/infinite-feed/InfiniteFeedEngine.js";
import type { MotionController } from "../../components/infinite-feed/motion-runtime";

export function InfiniteFeed(props: { options?: InfiniteFeedOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountInfiniteFeed(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="infinite-feed" />;
}
