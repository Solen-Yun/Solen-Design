<script lang="ts">
import { onMount } from "svelte";
import { mountAiBrandCoverCards, type AiBrandCoverCardsOptions } from "../../components/ai-brand-cover-cards/AiBrandCoverCardsEngine.js";
import type { MotionController } from "../../components/ai-brand-cover-cards/motion-runtime";
export let options: AiBrandCoverCardsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAiBrandCoverCards(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ai-brand-cover-cards"></div>
