<script lang="ts">
import { onMount } from "svelte";
import { mountStickyBuySheet, type StickyBuySheetOptions } from "../../components/sticky-buy-sheet/StickyBuySheetEngine.js";
import type { MotionController } from "../../components/sticky-buy-sheet/motion-runtime";
export let options: StickyBuySheetOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStickyBuySheet(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="sticky-buy-sheet"></div>
