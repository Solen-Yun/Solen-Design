<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountMorphingCursor, type MorphingCursorOptions } from "../../components/morphing-cursor/MorphingCursorEngine.js";
import type { MotionController } from "../../components/morphing-cursor/motion-runtime";
const props = defineProps<{ options?: MorphingCursorOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountMorphingCursor(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="morphing-cursor" /></template>
