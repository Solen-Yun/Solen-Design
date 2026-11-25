/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountAutosaveIndicator, type AutosaveIndicatorOptions } from "../../components/autosave-indicator/AutosaveIndicatorEngine.js";
import type { MotionController } from "../../components/autosave-indicator/motion-runtime";

export function AutosaveIndicator(props: { options?: AutosaveIndicatorOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountAutosaveIndicator(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="autosave-indicator" />;
}
