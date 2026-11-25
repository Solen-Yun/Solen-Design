<script lang="ts">
import { onMount } from "svelte";
import { mountPromoCodeSummary, type PromoCodeSummaryOptions } from "../../components/promo-code-summary/PromoCodeSummaryEngine.js";
import type { MotionController } from "../../components/promo-code-summary/motion-runtime";
export let options: PromoCodeSummaryOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPromoCodeSummary(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="promo-code-summary"></div>
