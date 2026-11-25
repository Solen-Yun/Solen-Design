<script lang="ts">
import { onMount } from "svelte";
import { mountTimelineLightUp, type TimelineLightUpOptions } from "../../components/timeline-light-up/TimelineLightUpEngine.js";
import type { MotionController } from "../../components/timeline-light-up/motion-runtime";
export let options: TimelineLightUpOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTimelineLightUp(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="timeline-light-up"></div>
