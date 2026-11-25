<script lang="ts">
import { onMount } from "svelte";
import { mountBottomSheetDetents, type BottomSheetDetentsOptions } from "../../components/bottom-sheet-detents/BottomSheetDetentsEngine.js";
import type { MotionController } from "../../components/bottom-sheet-detents/motion-runtime";
export let options: BottomSheetDetentsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBottomSheetDetents(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="bottom-sheet-detents"></div>
