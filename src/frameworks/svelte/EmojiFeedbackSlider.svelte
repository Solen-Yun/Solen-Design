<script lang="ts">
import { onMount } from "svelte";
import { mountEmojiFeedbackSlider, type EmojiFeedbackSliderOptions } from "../../components/emoji-feedback-slider/EmojiFeedbackSliderEngine.js";
import type { MotionController } from "../../components/emoji-feedback-slider/motion-runtime";
export let options: EmojiFeedbackSliderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountEmojiFeedbackSlider(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="emoji-feedback-slider"></div>
