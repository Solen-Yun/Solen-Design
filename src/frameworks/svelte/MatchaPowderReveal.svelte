<script lang="ts">
import { onMount } from "svelte";
import { mountMatchaPowderReveal, type MatchaPowderRevealOptions } from "../../components/matcha-powder-reveal/MatchaPowderRevealEngine.js";
import type { MotionController } from "../../components/matcha-powder-reveal/motion-runtime";
export let options: MatchaPowderRevealOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMatchaPowderReveal(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="matcha-powder-reveal"></div>
