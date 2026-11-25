<script lang="ts">
import { onMount } from "svelte";
import { mountThinkingParticles, type ThinkingParticlesOptions } from "../../components/thinking-particles/ThinkingParticlesEngine.js";
import type { MotionController } from "../../components/thinking-particles/motion-runtime";
export let options: ThinkingParticlesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountThinkingParticles(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="thinking-particles"></div>
