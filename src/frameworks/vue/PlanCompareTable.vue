<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountPlanCompareTable, type PlanCompareTableOptions } from "../../components/plan-compare-table/PlanCompareTableEngine.js";
import type { MotionController } from "../../components/plan-compare-table/motion-runtime";
const props = defineProps<{ options?: PlanCompareTableOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountPlanCompareTable(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="plan-compare-table" /></template>
