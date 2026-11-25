<script lang="ts">
import { onMount } from "svelte";
import { mountGrowthBubbles, type GrowthBubblesOptions } from "../../components/growth-bubbles/GrowthBubblesEngine.js";
import type { MotionController } from "../../components/growth-bubbles/motion-runtime";
export let options: GrowthBubblesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGrowthBubbles(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="growth-bubbles"></div>
