<script lang="ts">
import { onMount } from "svelte";
import { mountGlitchTitle, type GlitchTitleOptions } from "../../components/glitch-title/GlitchTitleEngine.js";
import type { MotionController } from "../../components/glitch-title/motion-runtime";
export let options: GlitchTitleOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGlitchTitle(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="glitch-title"></div>
