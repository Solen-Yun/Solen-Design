<script lang="ts">
import { onMount } from "svelte";
import { mountHideOnScrollHeader, type HideOnScrollHeaderOptions } from "../../components/hide-on-scroll-header/HideOnScrollHeaderEngine.js";
import type { MotionController } from "../../components/hide-on-scroll-header/motion-runtime";
export let options: HideOnScrollHeaderOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountHideOnScrollHeader(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="hide-on-scroll-header"></div>
