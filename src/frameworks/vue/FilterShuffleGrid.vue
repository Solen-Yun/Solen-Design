<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFilterShuffleGrid, type FilterShuffleGridOptions } from "../../components/filter-shuffle-grid/FilterShuffleGridEngine.js";
import type { MotionController } from "../../components/filter-shuffle-grid/motion-runtime";
const props = defineProps<{ options?: FilterShuffleGridOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFilterShuffleGrid(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="filter-shuffle-grid" /></template>
