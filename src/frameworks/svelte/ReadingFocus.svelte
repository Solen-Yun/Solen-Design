<script lang="ts">
import { onMount } from "svelte";
import { mountReadingFocus, type ReadingFocusOptions } from "../../components/reading-focus/ReadingFocusEngine.js";
import type { MotionController } from "../../components/reading-focus/motion-runtime";
export let options: ReadingFocusOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountReadingFocus(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="reading-focus"></div>
