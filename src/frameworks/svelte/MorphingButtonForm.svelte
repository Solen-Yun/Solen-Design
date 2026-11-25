<script lang="ts">
import { onMount } from "svelte";
import { mountMorphingButtonForm, type MorphingButtonFormOptions } from "../../components/morphing-button-form/MorphingButtonFormEngine.js";
import type { MotionController } from "../../components/morphing-button-form/motion-runtime";
export let options: MorphingButtonFormOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMorphingButtonForm(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="morphing-button-form"></div>
