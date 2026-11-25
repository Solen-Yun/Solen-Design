/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountStaggerRevealGrid, type StaggerRevealGridOptions } from "../../components/stagger-reveal-grid/StaggerRevealGridEngine.js";
import type { MotionController } from "../../components/stagger-reveal-grid/motion-runtime";

export function StaggerRevealGrid(props: { options?: StaggerRevealGridOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountStaggerRevealGrid(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="stagger-reveal-grid" />;
}
