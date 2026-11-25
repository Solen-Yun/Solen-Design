<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTextOnWavePath, type TextOnWavePathOptions } from "../../components/text-on-wave-path/TextOnWavePathEngine.js";
import type { MotionController } from "../../components/text-on-wave-path/motion-runtime";
const props = defineProps<{ options?: TextOnWavePathOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTextOnWavePath(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="text-on-wave-path" /></template>
