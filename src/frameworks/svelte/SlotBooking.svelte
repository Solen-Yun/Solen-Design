<script lang="ts">
import { onMount } from "svelte";
import { mountSlotBooking, type SlotBookingOptions } from "../../components/slot-booking/SlotBookingEngine.js";
import type { MotionController } from "../../components/slot-booking/motion-runtime";
export let options: SlotBookingOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSlotBooking(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="slot-booking"></div>
