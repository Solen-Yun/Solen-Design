<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountLineMaskReveal, type LineMaskRevealOptions } from "../../components/line-mask-reveal/LineMaskRevealEngine.js";
import type { MotionController } from "../../components/line-mask-reveal/motion-runtime";
const props = defineProps<{ options?: LineMaskRevealOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountLineMaskReveal(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="line-mask-reveal" /></template>
