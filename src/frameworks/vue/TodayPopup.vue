<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTodayPopup, type TodayPopupOptions } from "../../components/today-popup/TodayPopupEngine.js";
import type { MotionController } from "../../components/today-popup/motion-runtime";
const props = defineProps<{ options?: TodayPopupOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTodayPopup(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="today-popup" /></template>
