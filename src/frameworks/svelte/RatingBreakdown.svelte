<script lang="ts">
import { onMount } from "svelte";
import { mountRatingBreakdown, type RatingBreakdownOptions } from "../../components/rating-breakdown/RatingBreakdownEngine.js";
import type { MotionController } from "../../components/rating-breakdown/motion-runtime";
export let options: RatingBreakdownOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountRatingBreakdown(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="rating-breakdown"></div>
