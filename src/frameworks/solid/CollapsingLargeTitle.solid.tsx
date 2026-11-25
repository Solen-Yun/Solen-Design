/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCollapsingLargeTitle, type CollapsingLargeTitleOptions } from "../../components/collapsing-large-title/CollapsingLargeTitleEngine.js";
import type { MotionController } from "../../components/collapsing-large-title/motion-runtime";

export function CollapsingLargeTitle(props: { options?: CollapsingLargeTitleOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCollapsingLargeTitle(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="collapsing-large-title" />;
}
