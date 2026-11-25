<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSectionColorShift, type SectionColorShiftOptions } from "../../components/section-color-shift/SectionColorShiftEngine.js";
import type { MotionController } from "../../components/section-color-shift/motion-runtime";
const props = defineProps<{ options?: SectionColorShiftOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSectionColorShift(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="section-color-shift" /></template>
