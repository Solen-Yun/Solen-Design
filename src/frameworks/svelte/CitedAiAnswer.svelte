<script lang="ts">
import { onMount } from "svelte";
import { mountCitedAiAnswer, type CitedAiAnswerOptions } from "../../components/cited-ai-answer/CitedAiAnswerEngine.js";
import type { MotionController } from "../../components/cited-ai-answer/motion-runtime";
export let options: CitedAiAnswerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCitedAiAnswer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="cited-ai-answer"></div>
