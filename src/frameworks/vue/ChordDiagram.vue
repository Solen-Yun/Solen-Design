<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountChordDiagram, type ChordDiagramOptions } from "../../components/chord-diagram/ChordDiagramEngine.js";
import type { MotionController } from "../../components/chord-diagram/motion-runtime";
const props = defineProps<{ options?: ChordDiagramOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountChordDiagram(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="chord-diagram" /></template>
