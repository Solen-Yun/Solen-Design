<script lang="ts">
import { onMount } from "svelte";
import { mountSpoilerReveal, type SpoilerRevealOptions } from "../../components/spoiler-reveal/SpoilerRevealEngine.js";
import type { MotionController } from "../../components/spoiler-reveal/motion-runtime";
export let options: SpoilerRevealOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSpoilerReveal(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="spoiler-reveal"></div>
