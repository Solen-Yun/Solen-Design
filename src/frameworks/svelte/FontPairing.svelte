<script lang="ts">
import { onMount } from "svelte";
import { mountFontPairing, type FontPairingOptions } from "../../components/font-pairing/FontPairingEngine.js";
import type { MotionController } from "../../components/font-pairing/motion-runtime";
export let options: FontPairingOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFontPairing(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="font-pairing"></div>
