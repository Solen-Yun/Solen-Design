<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMorphingButtonForm, type MorphingButtonFormOptions } from "../../components/morphing-button-form/MorphingButtonFormEngine.js";
import type { MotionController } from "../../components/morphing-button-form/motion-runtime";
const props = defineProps<{ options?: MorphingButtonFormOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMorphingButtonForm(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="morphing-button-form" /></template>
