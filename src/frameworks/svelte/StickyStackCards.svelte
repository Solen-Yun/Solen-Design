<script lang="ts">
import { onMount } from "svelte";
import { mountStickyStackCards, type StickyStackCardsOptions } from "../../components/sticky-stack-cards/StickyStackCardsEngine.js";
import type { MotionController } from "../../components/sticky-stack-cards/motion-runtime";
export let options: StickyStackCardsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStickyStackCards(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="sticky-stack-cards"></div>
