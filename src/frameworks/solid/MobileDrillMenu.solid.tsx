/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountMobileDrillMenu, type MobileDrillMenuOptions } from "../../components/mobile-drill-menu/MobileDrillMenuEngine.js";
import type { MotionController } from "../../components/mobile-drill-menu/motion-runtime";

export function MobileDrillMenu(props: { options?: MobileDrillMenuOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountMobileDrillMenu(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="mobile-drill-menu" />;
}
