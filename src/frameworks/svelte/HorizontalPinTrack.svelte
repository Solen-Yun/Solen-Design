<script lang="ts">
import { onMount } from "svelte";
import { mountHorizontalPinTrack, type HorizontalPinTrackOptions } from "../../components/horizontal-pin-track/HorizontalPinTrackEngine.js";
import type { MotionController } from "../../components/horizontal-pin-track/motion-runtime";
export let options: HorizontalPinTrackOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountHorizontalPinTrack(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="horizontal-pin-track"></div>
