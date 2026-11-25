<script lang="ts">
import { onMount } from "svelte";
import { mountAuroraMesh, type AuroraMeshOptions } from "../../components/aurora-mesh/AuroraMeshEngine.js";
import type { MotionController } from "../../components/aurora-mesh/motion-runtime";
export let options: AuroraMeshOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountAuroraMesh(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="aurora-mesh"></div>
