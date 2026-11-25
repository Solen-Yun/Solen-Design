<script lang="ts">
import { onMount } from "svelte";
import { mountIsoBlockChart, type IsoBlockChartOptions } from "../../components/iso-block-chart/IsoBlockChartEngine.js";
import type { MotionController } from "../../components/iso-block-chart/motion-runtime";
export let options: IsoBlockChartOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountIsoBlockChart(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="iso-block-chart"></div>
