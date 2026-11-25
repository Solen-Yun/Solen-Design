<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountCompareTray, type CompareTrayOptions } from "../../components/compare-tray/CompareTrayEngine.js";
import type { MotionController } from "../../components/compare-tray/motion-runtime";
const props = defineProps<{ options?: CompareTrayOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountCompareTray(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="compare-tray" /></template>
