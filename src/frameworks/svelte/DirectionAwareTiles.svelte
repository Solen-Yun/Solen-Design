<script lang="ts">
import { onMount } from "svelte";
import { mountDirectionAwareTiles, type DirectionAwareTilesOptions } from "../../components/direction-aware-tiles/DirectionAwareTilesEngine.js";
import type { MotionController } from "../../components/direction-aware-tiles/motion-runtime";
export let options: DirectionAwareTilesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDirectionAwareTiles(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="direction-aware-tiles"></div>
