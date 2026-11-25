<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountUsageMeter, type UsageMeterOptions } from "../../components/usage-meter/UsageMeterEngine.js";
import type { MotionController } from "../../components/usage-meter/motion-runtime";
const props = defineProps<{ options?: UsageMeterOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountUsageMeter(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="usage-meter" /></template>
