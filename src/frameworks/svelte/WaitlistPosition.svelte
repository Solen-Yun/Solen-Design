<script lang="ts">
import { onMount } from "svelte";
import { mountWaitlistPosition, type WaitlistPositionOptions } from "../../components/waitlist-position/WaitlistPositionEngine.js";
import type { MotionController } from "../../components/waitlist-position/motion-runtime";
export let options: WaitlistPositionOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountWaitlistPosition(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="waitlist-position"></div>
