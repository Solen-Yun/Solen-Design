/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountParticleTextureTrio, type ParticleTextureTrioOptions } from "../../components/particle-texture-trio/ParticleTextureTrioEngine.js";
import type { MotionController } from "../../components/particle-texture-trio/motion-runtime";

export function ParticleTextureTrio(props: { options?: ParticleTextureTrioOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountParticleTextureTrio(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="particle-texture-trio" />;
}
