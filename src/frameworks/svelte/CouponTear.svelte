<script lang="ts">
import { onMount } from "svelte";
import { mountCouponTear, type CouponTearOptions } from "../../components/coupon-tear/CouponTearEngine.js";
import type { MotionController } from "../../components/coupon-tear/motion-runtime";
export let options: CouponTearOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCouponTear(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="coupon-tear"></div>
