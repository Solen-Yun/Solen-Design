<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBrandPosterCards, type BrandPosterCardsOptions } from "../../components/brand-poster-cards/BrandPosterCardsEngine.js";
import type { MotionController } from "../../components/brand-poster-cards/motion-runtime";
const props = defineProps<{ options?: BrandPosterCardsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBrandPosterCards(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="brand-poster-cards" /></template>
