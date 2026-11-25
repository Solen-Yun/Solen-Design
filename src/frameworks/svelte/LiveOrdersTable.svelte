<script lang="ts">
import { onMount } from "svelte";
import { mountLiveOrdersTable, type LiveOrdersTableOptions } from "../../components/live-orders-table/LiveOrdersTableEngine.js";
import type { MotionController } from "../../components/live-orders-table/motion-runtime";
export let options: LiveOrdersTableOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLiveOrdersTable(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="live-orders-table"></div>
