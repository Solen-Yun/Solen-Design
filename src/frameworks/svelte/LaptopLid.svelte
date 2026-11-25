<script lang="ts">
import { onMount } from "svelte";
import { mountLaptopLid, type LaptopLidOptions } from "../../components/laptop-lid/LaptopLidEngine.js";
import type { MotionController } from "../../components/laptop-lid/motion-runtime";
export let options: LaptopLidOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLaptopLid(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="laptop-lid"></div>
