<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSoftActionWheel, type SoftActionWheelOptions } from "../../components/soft-action-wheel/SoftActionWheelEngine.js";
import type { MotionController } from "../../components/soft-action-wheel/motion-runtime";
const props = defineProps<{ options?: SoftActionWheelOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSoftActionWheel(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="soft-action-wheel" /></template>
