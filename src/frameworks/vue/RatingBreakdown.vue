<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountRatingBreakdown, type RatingBreakdownOptions } from "../../components/rating-breakdown/RatingBreakdownEngine.js";
import type { MotionController } from "../../components/rating-breakdown/motion-runtime";
const props = defineProps<{ options?: RatingBreakdownOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountRatingBreakdown(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="rating-breakdown" /></template>
