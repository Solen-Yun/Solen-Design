<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountReadingFocus, type ReadingFocusOptions } from "../../components/reading-focus/ReadingFocusEngine.js";
import type { MotionController } from "../../components/reading-focus/motion-runtime";
const props = defineProps<{ options?: ReadingFocusOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountReadingFocus(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="reading-focus" /></template>
