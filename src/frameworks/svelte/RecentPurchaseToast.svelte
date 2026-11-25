<script lang="ts">
import { onMount } from "svelte";
import { mountRecentPurchaseToast, type RecentPurchaseToastOptions } from "../../components/recent-purchase-toast/RecentPurchaseToastEngine.js";
import type { MotionController } from "../../components/recent-purchase-toast/motion-runtime";
export let options: RecentPurchaseToastOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountRecentPurchaseToast(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="recent-purchase-toast"></div>
