<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBloomHexMap, type BloomHexMapOptions } from "../../components/bloom-hex-map/BloomHexMapEngine.js";
import type { MotionController } from "../../components/bloom-hex-map/motion-runtime";
const props = defineProps<{ options?: BloomHexMapOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBloomHexMap(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="bloom-hex-map" /></template>
