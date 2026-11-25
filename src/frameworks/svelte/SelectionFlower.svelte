<script lang="ts">
import { onMount } from "svelte";
import { mountSelectionFlower, type SelectionFlowerOptions } from "../../components/selection-flower/SelectionFlowerEngine.js";
import type { MotionController } from "../../components/selection-flower/motion-runtime";
export let options: SelectionFlowerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSelectionFlower(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="selection-flower"></div>
