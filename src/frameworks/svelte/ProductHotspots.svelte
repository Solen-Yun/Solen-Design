<script lang="ts">
import { onMount } from "svelte";
import { mountProductHotspots, type ProductHotspotsOptions } from "../../components/product-hotspots/ProductHotspotsEngine.js";
import type { MotionController } from "../../components/product-hotspots/motion-runtime";
export let options: ProductHotspotsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountProductHotspots(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="product-hotspots"></div>
