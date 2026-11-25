<script lang="ts">
import { onMount } from "svelte";
import { mountGradientRingCards, type GradientRingCardsOptions } from "../../components/gradient-ring-cards/GradientRingCardsEngine.js";
import type { MotionController } from "../../components/gradient-ring-cards/motion-runtime";
export let options: GradientRingCardsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGradientRingCards(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="gradient-ring-cards"></div>
