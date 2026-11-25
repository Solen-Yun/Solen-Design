<script lang="ts">
import { onMount } from "svelte";
import { mountAiPromptHero, type AiPromptHeroOptions } from "../../components/ai-prompt-hero/AiPromptHeroEngine.js";
import type { MotionController } from "../../components/ai-prompt-hero/motion-runtime";
export let options: AiPromptHeroOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAiPromptHero(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ai-prompt-hero"></div>
