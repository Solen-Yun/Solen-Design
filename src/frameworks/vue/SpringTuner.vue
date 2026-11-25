<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSpringTuner, type SpringTunerOptions } from "../../components/spring-tuner/SpringTunerEngine.js";
import type { MotionController } from "../../components/spring-tuner/motion-runtime";
const props = defineProps<{ options?: SpringTunerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSpringTuner(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="spring-tuner" /></template>
