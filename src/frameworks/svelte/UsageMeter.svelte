<script lang="ts">
import { onMount } from "svelte";
import { mountUsageMeter, type UsageMeterOptions } from "../../components/usage-meter/UsageMeterEngine.js";
import type { MotionController } from "../../components/usage-meter/motion-runtime";
export let options: UsageMeterOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountUsageMeter(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="usage-meter"></div>
