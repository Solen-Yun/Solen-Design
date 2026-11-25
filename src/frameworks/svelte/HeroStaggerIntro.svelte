<script lang="ts">
import { onMount } from "svelte";
import { mountHeroStaggerIntro, type HeroStaggerIntroOptions } from "../../components/hero-stagger-intro/HeroStaggerIntroEngine.js";
import type { MotionController } from "../../components/hero-stagger-intro/motion-runtime";
export let options: HeroStaggerIntroOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountHeroStaggerIntro(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="hero-stagger-intro"></div>
