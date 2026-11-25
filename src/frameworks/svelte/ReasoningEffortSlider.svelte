<script lang="ts">
import { onMount } from "svelte";
import { mountReasoningEffortSlider, type ReasoningEffortSliderOptions } from "../../components/reasoning-effort-slider/ReasoningEffortSliderEngine.js";
import type { MotionController } from "../../components/reasoning-effort-slider/motion-runtime";
export let options: ReasoningEffortSliderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountReasoningEffortSlider(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="reasoning-effort-slider"></div>
