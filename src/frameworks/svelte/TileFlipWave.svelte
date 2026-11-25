<script lang="ts">
import { onMount } from "svelte";
import { mountTileFlipWave, type TileFlipWaveOptions } from "../../components/tile-flip-wave/TileFlipWaveEngine.js";
import type { MotionController } from "../../components/tile-flip-wave/motion-runtime";
export let options: TileFlipWaveOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTileFlipWave(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="tile-flip-wave"></div>
