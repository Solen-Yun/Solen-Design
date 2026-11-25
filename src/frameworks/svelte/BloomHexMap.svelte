<script lang="ts">
import { onMount } from "svelte";
import { mountBloomHexMap, type BloomHexMapOptions } from "../../components/bloom-hex-map/BloomHexMapEngine.js";
import type { MotionController } from "../../components/bloom-hex-map/motion-runtime";
export let options: BloomHexMapOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBloomHexMap(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="bloom-hex-map"></div>
