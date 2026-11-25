<script lang="ts">
import { onMount } from "svelte";
import { mountStaggeredRadialMenu, type StaggeredRadialMenuOptions } from "../../components/staggered-radial-menu/StaggeredRadialMenuEngine.js";
import type { MotionController } from "../../components/staggered-radial-menu/motion-runtime";
export let options: StaggeredRadialMenuOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountStaggeredRadialMenu(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="staggered-radial-menu"></div>
