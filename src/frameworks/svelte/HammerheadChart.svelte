<script lang="ts">
import { onMount } from "svelte";
import { mountHammerheadChart, type HammerheadChartOptions } from "../../components/hammerhead-chart/HammerheadChartEngine.js";
import type { MotionController } from "../../components/hammerhead-chart/motion-runtime";
export let options: HammerheadChartOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountHammerheadChart(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="hammerhead-chart"></div>
