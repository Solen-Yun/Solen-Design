<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountImageAccordion, type ImageAccordionOptions } from "../../components/image-accordion/ImageAccordionEngine.js";
import type { MotionController } from "../../components/image-accordion/motion-runtime";
const props = defineProps<{ options?: ImageAccordionOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountImageAccordion(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="image-accordion" /></template>
