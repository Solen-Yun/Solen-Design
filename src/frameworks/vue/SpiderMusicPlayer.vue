<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountSpiderMusicPlayer, type SpiderMusicPlayerOptions } from "../../components/spider-music-player/SpiderMusicPlayerEngine.js";
import type { MotionController } from "../../components/spider-music-player/motion-runtime";
const props = defineProps<{ options?: SpiderMusicPlayerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountSpiderMusicPlayer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="spider-music-player" /></template>
