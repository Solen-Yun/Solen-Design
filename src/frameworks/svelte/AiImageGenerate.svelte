<script lang="ts">
import { onMount } from "svelte";
import { mountAiImageGenerate, type AiImageGenerateOptions } from "../../components/ai-image-generate/AiImageGenerateEngine.js";
import type { MotionController } from "../../components/ai-image-generate/motion-runtime";
export let options: AiImageGenerateOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAiImageGenerate(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ai-image-generate"></div>
