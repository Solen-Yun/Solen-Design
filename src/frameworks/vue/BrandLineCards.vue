<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBrandLineCards, type BrandLineCardsOptions } from "../../components/brand-line-cards/BrandLineCardsEngine.js";
import type { MotionController } from "../../components/brand-line-cards/motion-runtime";
const props = defineProps<{ options?: BrandLineCardsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBrandLineCards(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="brand-line-cards" /></template>
