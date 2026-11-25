<script lang="ts">
import { onMount } from "svelte";
import { mountLiquidWaveOnboarding, type LiquidWaveOnboardingOptions } from "../../components/liquid-wave-onboarding/LiquidWaveOnboardingEngine.js";
import type { MotionController } from "../../components/liquid-wave-onboarding/motion-runtime";
export let options: LiquidWaveOnboardingOptions = {};
let host: HTMLDivElement;
let controller: MotionController | undefined;
onMount(() => {
  const instance = mountLiquidWaveOnboarding(host, options);
  controller = instance;
  return () => { instance.destroy(); controller = undefined; };
});
$: controller?.update(options);
</script>

<div bind:this={host} class={$$restProps.class} data-motion-component="liquid-wave-onboarding"></div>
