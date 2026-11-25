<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDrumTimePicker, type DrumTimePickerOptions } from "../../components/drum-time-picker/DrumTimePickerEngine.js";
import type { MotionController } from "../../components/drum-time-picker/motion-runtime";
const props = defineProps<{ options?: DrumTimePickerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDrumTimePicker(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="drum-time-picker" /></template>
