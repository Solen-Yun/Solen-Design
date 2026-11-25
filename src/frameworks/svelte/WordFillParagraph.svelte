<script lang="ts">
import { onMount } from "svelte";
import { mountWordFillParagraph, type WordFillParagraphOptions } from "../../components/word-fill-paragraph/WordFillParagraphEngine.js";
import type { MotionController } from "../../components/word-fill-paragraph/motion-runtime";
export let options: WordFillParagraphOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountWordFillParagraph(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="word-fill-paragraph"></div>
