<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountFoldedEmojiScroll, type FoldedEmojiScrollOptions } from "../../components/folded-emoji-scroll/FoldedEmojiScrollEngine.js";
import type { MotionController } from "../../components/folded-emoji-scroll/motion-runtime";
const props = defineProps<{ options?: FoldedEmojiScrollOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountFoldedEmojiScroll(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="folded-emoji-scroll" /></template>
