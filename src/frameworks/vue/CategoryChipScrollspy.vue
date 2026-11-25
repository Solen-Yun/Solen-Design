<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCategoryChipScrollspy, type CategoryChipScrollspyOptions } from "../../components/category-chip-scrollspy/CategoryChipScrollspyEngine.js";
import type { MotionController } from "../../components/category-chip-scrollspy/motion-runtime";
const props = defineProps<{ options?: CategoryChipScrollspyOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCategoryChipScrollspy(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="category-chip-scrollspy" /></template>
