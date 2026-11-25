<script lang="ts">
import { onMount } from "svelte";
import { mountSpeedGauge, type SpeedGaugeOptions } from "../../components/speed-gauge/SpeedGaugeEngine.js";
import type { MotionController } from "../../components/speed-gauge/motion-runtime";
export let options: SpeedGaugeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSpeedGauge(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="speed-gauge"></div>
