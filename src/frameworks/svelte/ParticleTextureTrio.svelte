<script lang="ts">
import { onMount } from "svelte";
import { mountParticleTextureTrio, type ParticleTextureTrioOptions } from "../../components/particle-texture-trio/ParticleTextureTrioEngine.js";
import type { MotionController } from "../../components/particle-texture-trio/motion-runtime";
export let options: ParticleTextureTrioOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountParticleTextureTrio(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="particle-texture-trio"></div>
