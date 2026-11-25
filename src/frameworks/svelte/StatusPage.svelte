<script lang="ts">
import { onMount } from "svelte";
import { mountStatusPage, type StatusPageOptions } from "../../components/status-page/StatusPageEngine.js";
import type { MotionController } from "../../components/status-page/motion-runtime";
export let options: StatusPageOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStatusPage(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="status-page"></div>
