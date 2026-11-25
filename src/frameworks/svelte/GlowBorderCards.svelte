<script lang="ts">
import { onMount } from "svelte";
import { mountGlowBorderCards, type GlowBorderCardsOptions } from "../../components/glow-border-cards/GlowBorderCardsEngine.js";
import type { MotionController } from "../../components/glow-border-cards/motion-runtime";
export let options: GlowBorderCardsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGlowBorderCards(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="glow-border-cards"></div>
