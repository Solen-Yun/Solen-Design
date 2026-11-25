<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLiveOrdersTable, type LiveOrdersTableOptions } from "../../components/live-orders-table/LiveOrdersTableEngine.js";
import type { MotionController } from "../../components/live-orders-table/motion-runtime";
const props = defineProps<{ options?: LiveOrdersTableOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLiveOrdersTable(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="live-orders-table" /></template>
