<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountTileFlipWave, type TileFlipWaveOptions } from "../../components/tile-flip-wave/TileFlipWaveEngine.js";
import type { MotionController } from "../../components/tile-flip-wave/motion-runtime";
const props = defineProps<{ options?: TileFlipWaveOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountTileFlipWave(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="tile-flip-wave" /></template>
