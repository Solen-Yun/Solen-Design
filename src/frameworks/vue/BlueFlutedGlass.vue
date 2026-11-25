<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBlueFlutedGlass, type BlueFlutedGlassOptions } from "../../components/blue-fluted-glass/BlueFlutedGlassEngine.js";
import type { MotionController } from "../../components/blue-fluted-glass/motion-runtime";
const props = defineProps<{ options?: BlueFlutedGlassOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBlueFlutedGlass(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="blue-fluted-glass" /></template>
