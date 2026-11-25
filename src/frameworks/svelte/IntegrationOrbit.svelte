<script lang="ts">
import { onMount } from "svelte";
import { mountIntegrationOrbit, type IntegrationOrbitOptions } from "../../components/integration-orbit/IntegrationOrbitEngine.js";
import type { MotionController } from "../../components/integration-orbit/motion-runtime";
export let options: IntegrationOrbitOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountIntegrationOrbit(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="integration-orbit"></div>
