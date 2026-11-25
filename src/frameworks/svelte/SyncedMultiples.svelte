<script lang="ts">
import { onMount } from "svelte";
import { mountSyncedMultiples, type SyncedMultiplesOptions } from "../../components/synced-multiples/SyncedMultiplesEngine.js";
import type { MotionController } from "../../components/synced-multiples/motion-runtime";
export let options: SyncedMultiplesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSyncedMultiples(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="synced-multiples"></div>
