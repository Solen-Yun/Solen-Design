<script lang="ts">
import { onMount } from "svelte";
import { mountPageTransitionCurtain, type PageTransitionCurtainOptions } from "../../components/page-transition-curtain/PageTransitionCurtainEngine.js";
import type { MotionController } from "../../components/page-transition-curtain/motion-runtime";
export let options: PageTransitionCurtainOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountPageTransitionCurtain(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="page-transition-curtain"></div>
