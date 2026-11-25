<script lang="ts">
import { onMount } from "svelte";
import { mountImageAccordion, type ImageAccordionOptions } from "../../components/image-accordion/ImageAccordionEngine.js";
import type { MotionController } from "../../components/image-accordion/motion-runtime";
export let options: ImageAccordionOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountImageAccordion(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="image-accordion"></div>
