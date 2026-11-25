<script lang="ts">
import { onMount } from "svelte";
import { mountFloatingUiHero, type FloatingUiHeroOptions } from "../../components/floating-ui-hero/FloatingUiHeroEngine.js";
import type { MotionController } from "../../components/floating-ui-hero/motion-runtime";
export let options: FloatingUiHeroOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountFloatingUiHero(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="floating-ui-hero"></div>
