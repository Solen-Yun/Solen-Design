<script lang="ts">
import { onMount } from "svelte";
import { mountSodaCan, type SodaCanOptions } from "../../components/soda-can/SodaCanEngine.js";
import type { MotionController } from "../../components/soda-can/motion-runtime";
export let options: SodaCanOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSodaCan(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="soda-can"></div>
