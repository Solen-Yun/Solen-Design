<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountGlowBorderCards, type GlowBorderCardsOptions } from "../../components/glow-border-cards/GlowBorderCardsEngine.js";
import type { MotionController } from "../../components/glow-border-cards/motion-runtime";
const props = defineProps<{ options?: GlowBorderCardsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountGlowBorderCards(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="glow-border-cards" /></template>
