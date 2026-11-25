<script lang="ts">
import { onMount } from "svelte";
import { mountSlopeChart, type SlopeChartOptions } from "../../components/slope-chart/SlopeChartEngine.js";
import type { MotionController } from "../../components/slope-chart/motion-runtime";
export let options: SlopeChartOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSlopeChart(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="slope-chart"></div>
