<script lang="ts">
import { onMount } from "svelte";
import { mountDotGridWave, type DotGridWaveOptions } from "../../components/dot-grid-wave/DotGridWaveEngine.js";
import type { MotionController } from "../../components/dot-grid-wave/motion-runtime";
export let options: DotGridWaveOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDotGridWave(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="dot-grid-wave"></div>
