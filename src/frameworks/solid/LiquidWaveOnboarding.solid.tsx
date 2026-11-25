/** @jsxImportSource solid-js */
import { onMount, onCleanup, createEffect } from "solid-js";
import { mountLiquidWaveOnboarding, type LiquidWaveOnboardingOptions } from "../../components/liquid-wave-onboarding/LiquidWaveOnboardingEngine.js";
import type { MotionController } from "../../components/liquid-wave-onboarding/motion-runtime";

export function LiquidWaveOnboarding(props: { options?: LiquidWaveOnboardingOptions; class?: string }) {
  let host!: HTMLDivElement;
  let controller: MotionController | undefined;
  onMount(() => { controller = mountLiquidWaveOnboarding(host, props.options); });
  createEffect(() => { const options = props.options; controller?.update(options ?? {}); });
  onCleanup(() => controller?.destroy());
  return <div ref={host} class={props.class} data-motion-component="liquid-wave-onboarding" />;
}
