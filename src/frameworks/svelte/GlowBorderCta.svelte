<script lang="ts">
import { onMount } from "svelte";
import { mountGlowBorderCta, type GlowBorderCtaOptions } from "../../components/glow-border-cta/GlowBorderCtaEngine.js";
import type { MotionController } from "../../components/glow-border-cta/motion-runtime";
export let options: GlowBorderCtaOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountGlowBorderCta(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="glow-border-cta"></div>
