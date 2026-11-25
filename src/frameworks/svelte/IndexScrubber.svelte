<script lang="ts">
import { onMount } from "svelte";
import { mountIndexScrubber, type IndexScrubberOptions } from "../../components/index-scrubber/IndexScrubberEngine.js";
import type { MotionController } from "../../components/index-scrubber/motion-runtime";
export let options: IndexScrubberOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountIndexScrubber(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="index-scrubber"></div>
