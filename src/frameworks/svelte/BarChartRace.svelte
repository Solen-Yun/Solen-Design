<script lang="ts">
import { onMount } from "svelte";
import { mountBarChartRace, type BarChartRaceOptions } from "../../components/bar-chart-race/BarChartRaceEngine.js";
import type { MotionController } from "../../components/bar-chart-race/motion-runtime";
export let options: BarChartRaceOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBarChartRace(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="bar-chart-race"></div>
