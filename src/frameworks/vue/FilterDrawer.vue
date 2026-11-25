<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFilterDrawer, type FilterDrawerOptions } from "../../components/filter-drawer/FilterDrawerEngine.js";
import type { MotionController } from "../../components/filter-drawer/motion-runtime";
const props = defineProps<{ options?: FilterDrawerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFilterDrawer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="filter-drawer" /></template>
