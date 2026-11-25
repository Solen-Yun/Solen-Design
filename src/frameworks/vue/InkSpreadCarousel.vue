<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountInkSpreadCarousel, type InkSpreadCarouselOptions } from "../../components/ink-spread-carousel/InkSpreadCarouselEngine.js";
import type { MotionController } from "../../components/ink-spread-carousel/motion-runtime";
const props = defineProps<{ options?: InkSpreadCarouselOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountInkSpreadCarousel(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="ink-spread-carousel" /></template>
