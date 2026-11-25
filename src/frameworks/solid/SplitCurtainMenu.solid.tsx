/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountSplitCurtainMenu, type SplitCurtainMenuOptions } from "../../components/split-curtain-menu/SplitCurtainMenuEngine.js";
import type { MotionController } from "../../components/split-curtain-menu/motion-runtime";

export function SplitCurtainMenu(props: { options?: SplitCurtainMenuOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountSplitCurtainMenu(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="split-curtain-menu" />;
}
