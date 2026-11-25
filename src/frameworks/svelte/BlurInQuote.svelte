<script lang="ts">
import { onMount } from "svelte";
import { mountBlurInQuote, type BlurInQuoteOptions } from "../../components/blur-in-quote/BlurInQuoteEngine.js";
import type { MotionController } from "../../components/blur-in-quote/motion-runtime";
export let options: BlurInQuoteOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBlurInQuote(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="blur-in-quote"></div>
