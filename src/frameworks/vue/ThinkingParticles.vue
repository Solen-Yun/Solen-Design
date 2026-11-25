<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountThinkingParticles, type ThinkingParticlesOptions } from "../../components/thinking-particles/ThinkingParticlesEngine.js";
import type { MotionController } from "../../components/thinking-particles/motion-runtime";
const props = defineProps<{ options?: ThinkingParticlesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountThinkingParticles(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="thinking-particles" /></template>
