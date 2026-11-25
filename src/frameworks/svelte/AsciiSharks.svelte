<script lang="ts">
import { onMount } from "svelte";
import { mountAsciiSharks, type AsciiSharksOptions } from "../../components/ascii-sharks/AsciiSharksEngine.js";
import type { MotionController } from "../../components/ascii-sharks/motion-runtime";
export let options: AsciiSharksOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAsciiSharks(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="ascii-sharks"></div>
