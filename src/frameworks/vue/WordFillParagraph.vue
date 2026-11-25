<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountWordFillParagraph, type WordFillParagraphOptions } from "../../components/word-fill-paragraph/WordFillParagraphEngine.js";
import type { MotionController } from "../../components/word-fill-paragraph/motion-runtime";
const props = defineProps<{ options?: WordFillParagraphOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountWordFillParagraph(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="word-fill-paragraph" /></template>
