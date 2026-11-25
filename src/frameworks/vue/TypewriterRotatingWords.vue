<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTypewriterRotatingWords, type TypewriterRotatingWordsOptions } from "../../components/typewriter-rotating-words/TypewriterRotatingWordsEngine.js";
import type { MotionController } from "../../components/typewriter-rotating-words/motion-runtime";
const props = defineProps<{ options?: TypewriterRotatingWordsOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTypewriterRotatingWords(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="typewriter-rotating-words" /></template>
