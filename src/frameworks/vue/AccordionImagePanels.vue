<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAccordionImagePanels, type AccordionImagePanelsOptions } from "../../components/accordion-image-panels/AccordionImagePanelsEngine.js";
import type { MotionController } from "../../components/accordion-image-panels/motion-runtime";
const props = defineProps<{ options?: AccordionImagePanelsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAccordionImagePanels(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="accordion-image-panels" /></template>
