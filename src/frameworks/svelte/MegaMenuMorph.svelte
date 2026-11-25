<script lang="ts">
import { onMount } from "svelte";
import { mountMegaMenuMorph, type MegaMenuMorphOptions } from "../../components/mega-menu-morph/MegaMenuMorphEngine.js";
import type { MotionController } from "../../components/mega-menu-morph/motion-runtime";
export let options: MegaMenuMorphOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountMegaMenuMorph(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="mega-menu-morph"></div>
