<script lang="ts">
import { onMount } from "svelte";
import { mountDrumTimePicker, type DrumTimePickerOptions } from "../../components/drum-time-picker/DrumTimePickerEngine.js";
import type { MotionController } from "../../components/drum-time-picker/motion-runtime";
export let options: DrumTimePickerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDrumTimePicker(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="drum-time-picker"></div>
