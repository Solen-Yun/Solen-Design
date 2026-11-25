<script lang="ts">
import { onMount } from "svelte";
import { mountProximityWeight, type ProximityWeightOptions } from "../../components/proximity-weight/ProximityWeightEngine.js";
import type { MotionController } from "../../components/proximity-weight/motion-runtime";
export let options: ProximityWeightOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountProximityWeight(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="proximity-weight"></div>
