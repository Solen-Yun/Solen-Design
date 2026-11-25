/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountScrollMarqueeRows, type ScrollMarqueeRowsOptions } from "../../components/scroll-marquee-rows/ScrollMarqueeRowsEngine.js";
import type { MotionController } from "../../components/scroll-marquee-rows/motion-runtime";

export function ScrollMarqueeRows(props: { options?: ScrollMarqueeRowsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountScrollMarqueeRows(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="scroll-marquee-rows" />;
}
