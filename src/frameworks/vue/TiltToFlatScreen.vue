<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTiltToFlatScreen, type TiltToFlatScreenOptions } from "../../components/tilt-to-flat-screen/TiltToFlatScreenEngine.js";
import type { MotionController } from "../../components/tilt-to-flat-screen/motion-runtime";
const props = defineProps<{ options?: TiltToFlatScreenOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTiltToFlatScreen(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="tilt-to-flat-screen" /></template>
