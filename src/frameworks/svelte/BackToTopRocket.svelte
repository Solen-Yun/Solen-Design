<script lang="ts">
import { onMount } from "svelte";
import { mountBackToTopRocket, type BackToTopRocketOptions } from "../../components/back-to-top-rocket/BackToTopRocketEngine.js";
import type { MotionController } from "../../components/back-to-top-rocket/motion-runtime";
export let options: BackToTopRocketOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountBackToTopRocket(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="back-to-top-rocket"></div>
