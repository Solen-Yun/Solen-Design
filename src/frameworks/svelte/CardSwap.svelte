<script lang="ts">
import { onMount } from "svelte";
import { mountCardSwap, type CardSwapOptions } from "../../components/card-swap/CardSwapEngine.js";
import type { MotionController } from "../../components/card-swap/motion-runtime";
export let options: CardSwapOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCardSwap(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="card-swap"></div>
