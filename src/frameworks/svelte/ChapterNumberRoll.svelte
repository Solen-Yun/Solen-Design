<script lang="ts">
import { onMount } from "svelte";
import { mountChapterNumberRoll, type ChapterNumberRollOptions } from "../../components/chapter-number-roll/ChapterNumberRollEngine.js";
import type { MotionController } from "../../components/chapter-number-roll/motion-runtime";
export let options: ChapterNumberRollOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountChapterNumberRoll(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="chapter-number-roll"></div>
