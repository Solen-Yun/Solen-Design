<script lang="ts">
import { onMount } from "svelte";
import { mountBrandPosterCards, type BrandPosterCardsOptions } from "../../components/brand-poster-cards/BrandPosterCardsEngine.js";
import type { MotionController } from "../../components/brand-poster-cards/motion-runtime";
export let options: BrandPosterCardsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBrandPosterCards(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="brand-poster-cards"></div>
