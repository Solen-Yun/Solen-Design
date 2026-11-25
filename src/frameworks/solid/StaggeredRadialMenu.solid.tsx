/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStaggeredRadialMenu, type StaggeredRadialMenuOptions } from "../../components/staggered-radial-menu/StaggeredRadialMenuEngine.js";
import type { MotionController } from "../../components/staggered-radial-menu/motion-runtime";

export function StaggeredRadialMenu(props: { options?: StaggeredRadialMenuOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStaggeredRadialMenu(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="staggered-radial-menu" />;
}
