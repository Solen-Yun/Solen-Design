<script lang="ts">
import { onMount } from "svelte";
import { mountPrizeWheel, type PrizeWheelOptions } from "../../components/prize-wheel/PrizeWheelEngine.js";
import type { MotionController } from "../../components/prize-wheel/motion-runtime";
export let options: PrizeWheelOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPrizeWheel(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="prize-wheel"></div>
