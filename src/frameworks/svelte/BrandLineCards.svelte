<script lang="ts">
import { onMount } from "svelte";
import { mountBrandLineCards, type BrandLineCardsOptions } from "../../components/brand-line-cards/BrandLineCardsEngine.js";
import type { MotionController } from "../../components/brand-line-cards/motion-runtime";
export let options: BrandLineCardsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBrandLineCards(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="brand-line-cards"></div>
