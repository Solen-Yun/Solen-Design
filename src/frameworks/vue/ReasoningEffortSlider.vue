<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountReasoningEffortSlider, type ReasoningEffortSliderOptions } from "../../components/reasoning-effort-slider/ReasoningEffortSliderEngine.js";
import type { MotionController } from "../../components/reasoning-effort-slider/motion-runtime";
const props = defineProps<{ options?: ReasoningEffortSliderOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountReasoningEffortSlider(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="reasoning-effort-slider" /></template>
