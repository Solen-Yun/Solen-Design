<script lang="ts">
import { onMount } from "svelte";
import { mountStoryProgress, type StoryProgressOptions } from "../../components/story-progress/StoryProgressEngine.js";
import type { MotionController } from "../../components/story-progress/motion-runtime";
export let options: StoryProgressOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStoryProgress(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="story-progress"></div>
