/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStickyBuySheet, type StickyBuySheetOptions } from "../../components/sticky-buy-sheet/StickyBuySheetEngine.js";
import type { MotionController } from "../../components/sticky-buy-sheet/motion-runtime";

export function StickyBuySheet(props: { options?: StickyBuySheetOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStickyBuySheet(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="sticky-buy-sheet" />;
}
