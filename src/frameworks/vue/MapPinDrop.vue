<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMapPinDrop, type MapPinDropOptions } from "../../components/map-pin-drop/MapPinDropEngine.js";
import type { MotionController } from "../../components/map-pin-drop/motion-runtime";
const props = defineProps<{ options?: MapPinDropOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMapPinDrop(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="map-pin-drop" /></template>
