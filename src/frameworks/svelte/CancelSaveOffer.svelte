<script lang="ts">
import { onMount } from "svelte";
import { mountCancelSaveOffer, type CancelSaveOfferOptions } from "../../components/cancel-save-offer/CancelSaveOfferEngine.js";
import type { MotionController } from "../../components/cancel-save-offer/motion-runtime";
export let options: CancelSaveOfferOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCancelSaveOffer(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="cancel-save-offer"></div>
