<script lang="ts">
import { onMount } from "svelte";
import { mountCollapsingLargeTitle, type CollapsingLargeTitleOptions } from "../../components/collapsing-large-title/CollapsingLargeTitleEngine.js";
import type { MotionController } from "../../components/collapsing-large-title/motion-runtime";
export let options: CollapsingLargeTitleOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountCollapsingLargeTitle(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="collapsing-large-title"></div>
