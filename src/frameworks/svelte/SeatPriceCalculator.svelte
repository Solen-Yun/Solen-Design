<script lang="ts">
import { onMount } from "svelte";
import { mountSeatPriceCalculator, type SeatPriceCalculatorOptions } from "../../components/seat-price-calculator/SeatPriceCalculatorEngine.js";
import type { MotionController } from "../../components/seat-price-calculator/motion-runtime";
export let options: SeatPriceCalculatorOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSeatPriceCalculator(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="seat-price-calculator"></div>
