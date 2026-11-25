<script lang="ts">
import { onMount } from "svelte";
import { mountKeyholeZoom, type KeyholeZoomOptions } from "../../components/keyhole-zoom/KeyholeZoomEngine.js";
import type { MotionController } from "../../components/keyhole-zoom/motion-runtime";
export let options: KeyholeZoomOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountKeyholeZoom(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="keyhole-zoom"></div>
