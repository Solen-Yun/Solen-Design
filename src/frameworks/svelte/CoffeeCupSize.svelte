<script lang="ts">
import { onMount } from "svelte";
import { mountCoffeeCupSize, type CoffeeCupSizeOptions } from "../../components/coffee-cup-size/CoffeeCupSizeEngine.js";
import type { MotionController } from "../../components/coffee-cup-size/motion-runtime";
export let options: CoffeeCupSizeOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCoffeeCupSize(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="coffee-cup-size"></div>
