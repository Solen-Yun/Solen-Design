<script lang="ts">
import { onMount } from "svelte";
import { mountPageSpeedAudit, type PageSpeedAuditOptions } from "../../components/page-speed-audit/PageSpeedAuditEngine.js";
import type { MotionController } from "../../components/page-speed-audit/motion-runtime";
export let options: PageSpeedAuditOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPageSpeedAudit(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="page-speed-audit"></div>
