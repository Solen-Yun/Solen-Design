<script lang="ts">
import { onMount } from "svelte";
import { mountGiftBox, type GiftBoxOptions } from "../../components/gift-box/GiftBoxEngine.js";
import type { MotionController } from "../../components/gift-box/motion-runtime";
export let options: GiftBoxOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGiftBox(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="gift-box"></div>
