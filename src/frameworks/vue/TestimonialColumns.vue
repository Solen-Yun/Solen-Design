<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTestimonialColumns, type TestimonialColumnsOptions } from "../../components/testimonial-columns/TestimonialColumnsEngine.js";
import type { MotionController } from "../../components/testimonial-columns/motion-runtime";
const props = defineProps<{ options?: TestimonialColumnsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTestimonialColumns(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="testimonial-columns" /></template>
