<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTrendingSearchRoll, type TrendingSearchRollOptions } from "../../components/trending-search-roll/TrendingSearchRollEngine.js";
import type { MotionController } from "../../components/trending-search-roll/motion-runtime";
const props = defineProps<{ options?: TrendingSearchRollOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTrendingSearchRoll(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="trending-search-roll" /></template>
