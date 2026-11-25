<script lang="ts">
import { onMount } from "svelte";
import { mountTestimonialColumns, type TestimonialColumnsOptions } from "../../components/testimonial-columns/TestimonialColumnsEngine.js";
import type { MotionController } from "../../components/testimonial-columns/motion-runtime";
export let options: TestimonialColumnsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTestimonialColumns(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="testimonial-columns"></div>
