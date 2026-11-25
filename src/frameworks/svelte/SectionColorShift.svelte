<script lang="ts">
import { onMount } from "svelte";
import { mountSectionColorShift, type SectionColorShiftOptions } from "../../components/section-color-shift/SectionColorShiftEngine.js";
import type { MotionController } from "../../components/section-color-shift/motion-runtime";
export let options: SectionColorShiftOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSectionColorShift(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="section-color-shift"></div>
