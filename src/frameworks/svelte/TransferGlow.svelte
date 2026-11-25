<script lang="ts">
import { onMount } from "svelte";
import { mountTransferGlow, type TransferGlowOptions } from "../../components/transfer-glow/TransferGlowEngine.js";
import type { MotionController } from "../../components/transfer-glow/motion-runtime";
export let options: TransferGlowOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTransferGlow(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="transfer-glow"></div>
