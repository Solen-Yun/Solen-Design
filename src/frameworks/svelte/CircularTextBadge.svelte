<script lang="ts">
import { onMount } from "svelte";
import { mountCircularTextBadge, type CircularTextBadgeOptions } from "../../components/circular-text-badge/CircularTextBadgeEngine.js";
import type { MotionController } from "../../components/circular-text-badge/motion-runtime";
export let options: CircularTextBadgeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCircularTextBadge(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="circular-text-badge"></div>
