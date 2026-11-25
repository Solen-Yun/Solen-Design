<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDockingMiniPlayer, type DockingMiniPlayerOptions } from "../../components/docking-mini-player/DockingMiniPlayerEngine.js";
import type { MotionController } from "../../components/docking-mini-player/motion-runtime";
const props = defineProps<{ options?: DockingMiniPlayerOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDockingMiniPlayer(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="docking-mini-player" /></template>
