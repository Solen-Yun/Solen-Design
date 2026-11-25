<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountAsciiSharks, type AsciiSharksOptions } from "../../components/ascii-sharks/AsciiSharksEngine.js";
import type { MotionController } from "../../components/ascii-sharks/motion-runtime";
const props = defineProps<{ options?: AsciiSharksOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountAsciiSharks(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="ascii-sharks" /></template>
