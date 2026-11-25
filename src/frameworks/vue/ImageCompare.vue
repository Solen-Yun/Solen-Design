<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountImageCompare, type ImageCompareOptions } from "../../components/image-compare/ImageCompareEngine.js";
import type { MotionController } from "../../components/image-compare/motion-runtime";
const props = defineProps<{ options?: ImageCompareOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountImageCompare(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="image-compare" /></template>
