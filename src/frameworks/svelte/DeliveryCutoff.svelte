<script lang="ts">
import { onMount } from "svelte";
import { mountDeliveryCutoff, type DeliveryCutoffOptions } from "../../components/delivery-cutoff/DeliveryCutoffEngine.js";
import type { MotionController } from "../../components/delivery-cutoff/motion-runtime";
export let options: DeliveryCutoffOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountDeliveryCutoff(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="delivery-cutoff"></div>
