/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountCosmicPanels, type CosmicPanelsOptions } from "../../components/cosmic-panels/CosmicPanelsEngine.js";
import type { MotionController } from "../../components/cosmic-panels/motion-runtime";

export function CosmicPanels(props: { options?: CosmicPanelsOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountCosmicPanels(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="cosmic-panels" />;
}
