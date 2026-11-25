/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLinkShortener, type LinkShortenerOptions } from "../../components/link-shortener/LinkShortenerEngine.js";
import type { MotionController } from "../../components/link-shortener/motion-runtime";

export function LinkShortener(props: { options?: LinkShortenerOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLinkShortener(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="link-shortener" />;
}
