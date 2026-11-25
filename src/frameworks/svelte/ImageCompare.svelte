<script lang="ts">
import { onMount } from "svelte";
import { mountImageCompare, type ImageCompareOptions } from "../../components/image-compare/ImageCompareEngine.js";
import type { MotionController } from "../../components/image-compare/motion-runtime";
export let options: ImageCompareOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountImageCompare(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="image-compare"></div>
