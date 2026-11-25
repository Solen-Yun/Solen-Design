/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountA11yPanel, type A11yPanelOptions } from "../../components/a11y-panel/A11yPanelEngine.js";
import type { MotionController } from "../../components/a11y-panel/motion-runtime";

export function A11yPanel(props: { options?: A11yPanelOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountA11yPanel(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="a11y-panel" />;
}
