<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountNotesTextColor, type NotesTextColorOptions } from "../../components/notes-text-color/NotesTextColorEngine.js";
import type { MotionController } from "../../components/notes-text-color/motion-runtime";
const props = defineProps<{ options?: NotesTextColorOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountNotesTextColor(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="notes-text-color" /></template>
