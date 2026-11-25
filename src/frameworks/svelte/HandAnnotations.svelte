<script lang="ts">
import { onMount } from "svelte";
import { mountHandAnnotations, type HandAnnotationsOptions } from "../../components/hand-annotations/HandAnnotationsEngine.js";
import type { MotionController } from "../../components/hand-annotations/motion-runtime";
export let options: HandAnnotationsOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountHandAnnotations(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="hand-annotations"></div>
