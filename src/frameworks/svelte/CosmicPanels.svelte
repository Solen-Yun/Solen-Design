<script lang="ts">
import { onMount } from "svelte";
import { mountCosmicPanels, type CosmicPanelsOptions } from "../../components/cosmic-panels/CosmicPanelsEngine.js";
import type { MotionController } from "../../components/cosmic-panels/motion-runtime";
export let options: CosmicPanelsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCosmicPanels(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="cosmic-panels"></div>
