<script lang="ts">
import { onMount } from "svelte";
import { mountMapClusters, type MapClustersOptions } from "../../components/map-clusters/MapClustersEngine.js";
import type { MotionController } from "../../components/map-clusters/motion-runtime";
export let options: MapClustersOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMapClusters(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="map-clusters"></div>
