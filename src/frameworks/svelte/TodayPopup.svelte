<script lang="ts">
import { onMount } from "svelte";
import { mountTodayPopup, type TodayPopupOptions } from "../../components/today-popup/TodayPopupEngine.js";
import type { MotionController } from "../../components/today-popup/motion-runtime";
export let options: TodayPopupOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTodayPopup(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="today-popup"></div>
