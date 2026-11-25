<script lang="ts">
import { onMount } from "svelte";
import { mountWaffleChart, type WaffleChartOptions } from "../../components/waffle-chart/WaffleChartEngine.js";
import type { MotionController } from "../../components/waffle-chart/motion-runtime";
export let options: WaffleChartOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountWaffleChart(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="waffle-chart"></div>
