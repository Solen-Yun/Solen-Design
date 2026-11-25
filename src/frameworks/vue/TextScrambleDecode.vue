<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTextScrambleDecode, type TextScrambleDecodeOptions } from "../../components/text-scramble-decode/TextScrambleDecodeEngine.js";
import type { MotionController } from "../../components/text-scramble-decode/motion-runtime";
const props = defineProps<{ options?: TextScrambleDecodeOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTextScrambleDecode(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="text-scramble-decode" /></template>
