<script lang="ts">
import { onMount } from "svelte";
import { mountCompareTray, type CompareTrayOptions } from "../../components/compare-tray/CompareTrayEngine.js";
import type { MotionController } from "../../components/compare-tray/motion-runtime";
export let options: CompareTrayOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCompareTray(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="compare-tray"></div>
