<script lang="ts">
import { onMount } from "svelte";
import { mountPixelToggle, type PixelToggleOptions } from "../../components/pixel-toggle/PixelToggleEngine.js";
import type { MotionController } from "../../components/pixel-toggle/motion-runtime";
export let options: PixelToggleOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPixelToggle(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="pixel-toggle"></div>
