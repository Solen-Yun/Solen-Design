<script lang="ts">
import { onMount } from "svelte";
import { mountScrollDrawRoute, type ScrollDrawRouteOptions } from "../../components/scroll-draw-route/ScrollDrawRouteEngine.js";
import type { MotionController } from "../../components/scroll-draw-route/motion-runtime";
export let options: ScrollDrawRouteOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountScrollDrawRoute(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="scroll-draw-route"></div>
