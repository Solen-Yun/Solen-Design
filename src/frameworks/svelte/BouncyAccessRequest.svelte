<script lang="ts">
import { onMount } from "svelte";
import { mountBouncyAccessRequest, type BouncyAccessRequestOptions } from "../../components/bouncy-access-request/BouncyAccessRequestEngine.js";
import type { MotionController } from "../../components/bouncy-access-request/motion-runtime";
export let options: BouncyAccessRequestOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBouncyAccessRequest(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="bouncy-access"></div>
