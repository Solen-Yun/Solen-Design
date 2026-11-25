<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountStoryProgress, type StoryProgressOptions } from "../../components/story-progress/StoryProgressEngine.js";
import type { MotionController } from "../../components/story-progress/motion-runtime";
const props = defineProps<{ options?: StoryProgressOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountStoryProgress(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="story-progress" /></template>
