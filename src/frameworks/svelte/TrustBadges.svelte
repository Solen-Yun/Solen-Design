<script lang="ts">
import { onMount } from "svelte";
import { mountTrustBadges, type TrustBadgesOptions } from "../../components/trust-badges/TrustBadgesEngine.js";
import type { MotionController } from "../../components/trust-badges/motion-runtime";
export let options: TrustBadgesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountTrustBadges(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="trust-badges"></div>
