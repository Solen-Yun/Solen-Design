<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLiquidWaveOnboarding, type LiquidWaveOnboardingOptions } from "../../components/liquid-wave-onboarding/LiquidWaveOnboardingEngine.js";
import type { MotionController } from "../../components/liquid-wave-onboarding/motion-runtime";
const props = defineProps<{ options?: LiquidWaveOnboardingOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLiquidWaveOnboarding(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="liquid-wave-onboarding" /></template>
