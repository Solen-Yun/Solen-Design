<script lang="ts">
import { onMount } from "svelte";
import { mountMapPinDrop, type MapPinDropOptions } from "../../components/map-pin-drop/MapPinDropEngine.js";
import type { MotionController } from "../../components/map-pin-drop/motion-runtime";
export let options: MapPinDropOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMapPinDrop(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="map-pin-drop"></div>
