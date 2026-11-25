<script lang="ts">
import { onMount } from "svelte";
import { mountProductLoupe, type ProductLoupeOptions } from "../../components/product-loupe/ProductLoupeEngine.js";
import type { MotionController } from "../../components/product-loupe/motion-runtime";
export let options: ProductLoupeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountProductLoupe(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="product-loupe"></div>
