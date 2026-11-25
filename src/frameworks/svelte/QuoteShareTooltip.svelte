<script lang="ts">
import { onMount } from "svelte";
import { mountQuoteShareTooltip, type QuoteShareTooltipOptions } from "../../components/quote-share-tooltip/QuoteShareTooltipEngine.js";
import type { MotionController } from "../../components/quote-share-tooltip/motion-runtime";
export let options: QuoteShareTooltipOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountQuoteShareTooltip(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="quote-share-tooltip"></div>
