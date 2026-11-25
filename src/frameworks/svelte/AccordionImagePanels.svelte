<script lang="ts">
import { onMount } from "svelte";
import { mountAccordionImagePanels, type AccordionImagePanelsOptions } from "../../components/accordion-image-panels/AccordionImagePanelsEngine.js";
import type { MotionController } from "../../components/accordion-image-panels/motion-runtime";
export let options: AccordionImagePanelsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAccordionImagePanels(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="accordion-image-panels"></div>
