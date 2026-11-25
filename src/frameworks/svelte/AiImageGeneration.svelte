<script lang="ts">
import { onMount } from "svelte";
import { mountAiImageGeneration, type AiImageGenerationOptions } from "../../components/ai-image-generation/AiImageGenerationEngine.js";
import type { MotionController } from "../../components/ai-image-generation/motion-runtime";
export let options: AiImageGenerationOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAiImageGeneration(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ai-generating"></div>
