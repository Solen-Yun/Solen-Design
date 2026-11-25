<script lang="ts">
import { onMount } from "svelte";
import { mountMorphingCursor, type MorphingCursorOptions } from "../../components/morphing-cursor/MorphingCursorEngine.js";
import type { MotionController } from "../../components/morphing-cursor/motion-runtime";
export let options: MorphingCursorOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMorphingCursor(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="morphing-cursor"></div>
