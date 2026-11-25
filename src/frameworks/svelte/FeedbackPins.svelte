<script lang="ts">
import { onMount } from "svelte";
import { mountFeedbackPins, type FeedbackPinsOptions } from "../../components/feedback-pins/FeedbackPinsEngine.js";
import type { MotionController } from "../../components/feedback-pins/motion-runtime";
export let options: FeedbackPinsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFeedbackPins(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="feedback-pins"></div>
