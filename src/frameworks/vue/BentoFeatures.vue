<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountBentoFeatures, type BentoFeaturesOptions } from "../../components/bento-features/BentoFeaturesEngine.js";
import type { MotionController } from "../../components/bento-features/motion-runtime";
const props = defineProps<{ options?: BentoFeaturesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountBentoFeatures(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="bento-features" /></template>
