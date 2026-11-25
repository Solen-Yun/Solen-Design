<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBottomSheetDetents, type BottomSheetDetentsOptions } from "../../components/bottom-sheet-detents/BottomSheetDetentsEngine.js";
import type { MotionController } from "../../components/bottom-sheet-detents/motion-runtime";
const props = defineProps<{ options?: BottomSheetDetentsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBottomSheetDetents(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="bottom-sheet-detents" /></template>
