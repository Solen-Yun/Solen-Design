/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountParticleNetwork, type ParticleNetworkOptions } from "../../components/particle-network/ParticleNetworkEngine.js";
import type { MotionController } from "../../components/particle-network/motion-runtime";

export function ParticleNetwork(props: { options?: ParticleNetworkOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountParticleNetwork(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="particle-network" />;
}
