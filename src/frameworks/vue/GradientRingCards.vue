<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGradientRingCards, type GradientRingCardsOptions } from "../../components/gradient-ring-cards/GradientRingCardsEngine.js";
import type { MotionController } from "../../components/gradient-ring-cards/motion-runtime";
const props = defineProps<{ options?: GradientRingCardsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGradientRingCards(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="gradient-ring-cards" /></template>
