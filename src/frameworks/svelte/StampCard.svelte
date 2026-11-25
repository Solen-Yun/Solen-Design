<script lang="ts">
import { onMount } from "svelte";
import { mountStampCard, type StampCardOptions } from "../../components/stamp-card/StampCardEngine.js";
import type { MotionController } from "../../components/stamp-card/motion-runtime";
export let options: StampCardOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStampCard(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="stamp-card"></div>
