<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { mountDirectionAwareTiles, type DirectionAwareTilesOptions } from "../../components/direction-aware-tiles/DirectionAwareTilesEngine.js";
import type { MotionController } from "../../components/direction-aware-tiles/motion-runtime";
const props = defineProps<{ options?: DirectionAwareTilesOptions; class?: string }>();
const host = ref<HTMLDivElement | null>(null);
let controller: MotionController | undefined;
onMounted(() => { controller = mountDirectionAwareTiles(host.value!, props.options); });
watch(() => props.options, value => controller?.update(value ?? {}), { deep: true });
onBeforeUnmount(() => controller?.destroy());
</script>

<template><div ref="host" :class="props.class" data-motion-component="direction-aware-tiles" /></template>
