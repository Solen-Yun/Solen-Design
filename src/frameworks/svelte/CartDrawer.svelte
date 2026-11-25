<script lang="ts">
import { onMount } from "svelte";
import { mountCartDrawer, type CartDrawerOptions } from "../../components/cart-drawer/CartDrawerEngine.js";
import type { MotionController } from "../../components/cart-drawer/motion-runtime";
export let options: CartDrawerOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCartDrawer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="cart-drawer"></div>
