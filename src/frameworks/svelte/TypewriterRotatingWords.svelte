<script lang="ts">
import { onMount } from "svelte";
import { mountTypewriterRotatingWords, type TypewriterRotatingWordsOptions } from "../../components/typewriter-rotating-words/TypewriterRotatingWordsEngine.js";
import type { MotionController } from "../../components/typewriter-rotating-words/motion-runtime";
export let options: TypewriterRotatingWordsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTypewriterRotatingWords(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="typewriter-rotating-words"></div>
