<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStaggerRevealGrid, type StaggerRevealGridOptions } from "../../components/stagger-reveal-grid/StaggerRevealGridEngine.js";
import type { MotionController } from "../../components/stagger-reveal-grid/motion-runtime";
const props = defineProps<{ options?: StaggerRevealGridOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStaggerRevealGrid(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="stagger-reveal-grid" /></template>
