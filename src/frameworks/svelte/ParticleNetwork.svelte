<script lang="ts">
import { onMount } from "svelte";
import { mountParticleNetwork, type ParticleNetworkOptions } from "../../components/particle-network/ParticleNetworkEngine.js";
import type { MotionController } from "../../components/particle-network/motion-runtime";
export let options: ParticleNetworkOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountParticleNetwork(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="particle-network"></div>
