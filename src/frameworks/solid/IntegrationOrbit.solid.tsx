/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountIntegrationOrbit, type IntegrationOrbitOptions } from "../../components/integration-orbit/IntegrationOrbitEngine.js";
import type { MotionController } from "../../components/integration-orbit/motion-runtime";

export function IntegrationOrbit(props: { options?: IntegrationOrbitOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountIntegrationOrbit(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="integration-orbit" />;
}
