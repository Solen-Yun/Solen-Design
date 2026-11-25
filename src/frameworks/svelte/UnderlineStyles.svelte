<script lang="ts">
import { onMount } from "svelte";
import { mountUnderlineStyles, type UnderlineStylesOptions } from "../../components/underline-styles/UnderlineStylesEngine.js";
import type { MotionController } from "../../components/underline-styles/motion-runtime";
export let options: UnderlineStylesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountUnderlineStyles(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="underline-styles"></div>
