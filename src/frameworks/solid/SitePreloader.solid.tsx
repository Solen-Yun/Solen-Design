/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSitePreloader, type SitePreloaderOptions } from "../../components/site-preloader/SitePreloaderEngine.js";
import type { MotionController } from "../../components/site-preloader/motion-runtime";

export function SitePreloader(props: { options?: SitePreloaderOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSitePreloader(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="site-preloader" />;
}
