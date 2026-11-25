<script lang="ts">
import { onMount } from "svelte";
import { mountRevealFooter, type RevealFooterOptions } from "../../components/reveal-footer/RevealFooterEngine.js";
import type { MotionController } from "../../components/reveal-footer/motion-runtime";
export let options: RevealFooterOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountRevealFooter(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="reveal-footer"></div>
