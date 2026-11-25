<script lang="ts">
import { onMount } from "svelte";
import { mountSplitCurtainMenu, type SplitCurtainMenuOptions } from "../../components/split-curtain-menu/SplitCurtainMenuEngine.js";
import type { MotionController } from "../../components/split-curtain-menu/motion-runtime";
export let options: SplitCurtainMenuOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountSplitCurtainMenu(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="split-curtain-menu"></div>
