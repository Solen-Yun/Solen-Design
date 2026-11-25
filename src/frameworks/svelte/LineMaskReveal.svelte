<script lang="ts">
import { onMount } from "svelte";
import { mountLineMaskReveal, type LineMaskRevealOptions } from "../../components/line-mask-reveal/LineMaskRevealEngine.js";
import type { MotionController } from "../../components/line-mask-reveal/motion-runtime";
export let options: LineMaskRevealOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLineMaskReveal(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="line-mask-reveal"></div>
