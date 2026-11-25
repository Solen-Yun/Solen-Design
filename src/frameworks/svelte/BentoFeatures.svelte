<script lang="ts">
import { onMount } from "svelte";
import { mountBentoFeatures, type BentoFeaturesOptions } from "../../components/bento-features/BentoFeaturesEngine.js";
import type { MotionController } from "../../components/bento-features/motion-runtime";
export let options: BentoFeaturesOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBentoFeatures(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="bento-features"></div>
