<script lang="ts">
import { onMount } from "svelte";
import { mountSoftActionWheel, type SoftActionWheelOptions } from "../../components/soft-action-wheel/SoftActionWheelEngine.js";
import type { MotionController } from "../../components/soft-action-wheel/motion-runtime";
export let options: SoftActionWheelOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSoftActionWheel(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="soft-action-wheel"></div>
